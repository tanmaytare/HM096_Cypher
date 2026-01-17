# app.py (API VERSION)

from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from utils.disease import disease_dic
from utils.fertilizer import fertilizer_dic
import requests
import config
import pickle
import io
import torch
from torchvision import transforms
from PIL import Image
from utils.model import ResNet9
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow cross-origin requests

# ------------------- Load models ----------------------

disease_classes = ['Apple___Apple_scab',
                   'Apple___Black_rot',
                   'Apple___Cedar_apple_rust',
                   'Apple___healthy',
                   'Blueberry___healthy',
                   'Cherry_(including_sour)___Powdery_mildew',
                   'Cherry_(including_sour)___healthy',
                   'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
                   'Corn_(maize)___Common_rust_',
                   'Corn_(maize)___Northern_Leaf_Blight',
                   'Corn_(maize)___healthy',
                   'Grape___Black_rot',
                   'Grape___Esca_(Black_Measles)',
                   'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
                   'Grape___healthy',
                   'Orange___Haunglongbing_(Citrus_greening)',
                   'Peach___Bacterial_spot',
                   'Peach___healthy',
                   'Pepper,_bell___Bacterial_spot',
                   'Pepper,_bell___healthy',
                   'Potato___Early_blight',
                   'Potato___Late_blight',
                   'Potato___healthy',
                   'Raspberry___healthy',
                   'Soybean___healthy',
                   'Squash___Powdery_mildew',
                   'Strawberry___Leaf_scorch',
                   'Strawberry___healthy',
                   'Tomato___Bacterial_spot',
                   'Tomato___Early_blight',
                   'Tomato___Late_blight',
                   'Tomato___Leaf_Mold',
                   'Tomato___Septoria_leaf_spot',
                   'Tomato___Spider_mites Two-spotted_spider_mite',
                   'Tomato___Target_Spot',
                   'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
                   'Tomato___Tomato_mosaic_virus',
                   'Tomato___healthy']  # (same as your original list)

disease_model_path = 'models/plant_disease_model.pth'
disease_model = ResNet9(3, len(disease_classes))
disease_model.load_state_dict(torch.load(
    disease_model_path, map_location=torch.device('cpu')))
disease_model.eval()

crop_recommendation_model_path = 'models/RandomForest.pkl'
crop_recommendation_model = pickle.load(open(crop_recommendation_model_path, 'rb'))

# ------------------- Helpers ----------------------

def weather_fetch(city_name):
    api_key = config.weather_api_key
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)
    x = response.json()
    if x["cod"] != "404":
        y = x["main"]
        temperature = round((y["temp"] - 273.15), 2)
        humidity = y["humidity"]
        return temperature, humidity
    else:
        return None

def predict_image(img, model=disease_model):
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.ToTensor(),
    ])
    image = Image.open(io.BytesIO(img))
    img_t = transform(image)
    img_u = torch.unsqueeze(img_t, 0)
    yb = model(img_u)
    _, preds = torch.max(yb, dim=1)
    prediction = disease_classes[preds[0].item()]
    return prediction

# ------------------- API Routes ----------------------

@app.route('/')
def index():
    return jsonify({'message': 'ML API is running'})

@app.route('/api/crop-recommend', methods=['POST'])
def crop_prediction():
    data = request.json
    N = data['nitrogen']
    P = data['phosphorous']
    K = data['pottasium']
    ph = data['ph']
    rainfall = data['rainfall']
    city = data['city']

    weather = weather_fetch(city)
    if weather:
        temperature, humidity = weather
        input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
        prediction = crop_recommendation_model.predict(input_data)
        return jsonify({'crop': prediction[0]})
    else:
        return jsonify({'error': 'City not found'}), 404

@app.route('/api/fertilizer-recommend', methods=['POST'])
def fert_recommend():
    try:
        data = request.json
        crop_name = data.get('cropname', '').strip().lower()
        N = data.get('nitrogen', 0)
        P = data.get('phosphorous', 0)
        K = data.get('pottasium', 0)

        df = pd.read_csv('Data/fertilizer.csv')

        # Ensure Crop column exists
        if 'Crop' not in df.columns:
            return jsonify({'error': 'Crop column not found in dataset'}), 500

        df['Crop'] = df['Crop'].str.strip().str.lower()

        # Check if crop exists
        if crop_name not in df['Crop'].values:
            return jsonify({'error': f'Crop "{crop_name}" not found in dataset'}), 404

        crop_data = df[df['Crop'] == crop_name]

        if crop_data.empty:
            return jsonify({'error': 'No data available for this crop'}), 404

        nr = crop_data['N'].iloc[0]
        pr = crop_data['P'].iloc[0]
        kr = crop_data['K'].iloc[0]

        n, p, k = nr - N, pr - P, kr - K
        temp = {abs(n): "N", abs(p): "P", abs(k): "K"}
        max_value = temp[max(temp.keys())]

        key = f"{max_value}High" if eval(max_value.lower()) < 0 else f"{max_value}Low"
        recommendation = fertilizer_dic.get(key, "No recommendation available")

        return jsonify({'recommendation': recommendation})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/disease-detect', methods=['POST'])
def disease_prediction():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    img = file.read()
    prediction = predict_image(img)
    description = disease_dic.get(prediction, "No description available")
    return jsonify({'disease': prediction, 'description': description})
    

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=False)
