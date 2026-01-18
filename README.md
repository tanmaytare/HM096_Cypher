# KrushiSetu 🌾

A full-stack agricultural platform connecting farmers, equipment renters, and laborers with AI-powered services.

## ⚡ Quick Overview

**KrushiSetu** is an integrated ecosystem providing:
- 🚜 Equipment rental marketplace with availability calendar and ratings
- 🏪 Agricultural product marketplace with Stripe payments
- 👨‍🌾 Labor hiring platform for seasonal work
- 🤖 AI services: crop recommendation, fertilizer suggestion, disease detection
- 📱 Real-time weather, news, and soil reports
- 🔐 Secure JWT authentication with OTP verification

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Angular 18, Tailwind CSS, Stripe.js |
| **Backend** | Node.js, Express, MongoDB, JWT |
| **ML** | Python, TensorFlow, Flask |
| **Deployment** | Docker, Docker Compose |

---

## 📦 Project Structure

```
KrushiSetu/
├── frontend/          # Angular 18 app (port 4200)
├── backend/           # Express API (port 5000)
├── ML/               # Flask ML service (port 5001)
└── docker-compose.yml
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+, MongoDB, Python 3.8+

### Setup (3 Steps)

**1. Backend**
```bash
cd backend
npm install
# Create .env with MONGO_URI, JWT_SECRET, STRIPE keys
node app.js
```

**2. Frontend**
```bash
cd frontend
npm install
ng serve -o
```

**3. ML Service (Optional)**
```bash
cd ML/app
pip install -r requirements.txt
python app.py
```

```
Access: Frontend (4200) | Backend (5000) | ML (5001) | MongoDB (27017)

---

## 📋 Core Features

### Equipment Rental
- List & search equipment by city/category
- Date-based booking with conflict detection
- Availability calendar showing booked dates
- User ratings and reviews
- Current rental status tracking

### Marketplace
- Product listing and cart
- Stripe payment integration
- Order management
- User ratings

### Labor Hiring
- Job posting and applications
- Application tracking
- Job history

### AI Services
- **Crop Recommendation** – Based on soil/climate data
- **Fertilizer Suggestion** – Personalized recommendations
- **Disease Detection** – ResNet image classification
- **Weather Data** – Real-time location-based forecasts

---

## 🔌 Key API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/signup` | POST | User registration |
| `/equipment/available` | GET | List equipment (filters: city, category) |
| `/equipment/add` | POST | Add equipment |
| `/rentals/rent` | POST | Create rental booking |
| `/products/all` | GET | Browse products |
| `/cart/add` | POST | Add to cart |
| `/order/place` | POST | Place order |
| `/job/post` | POST | Post job listing |
| `/job/apply` | POST | Apply to job |

---

## 📊 Database Models

- **User** – name, email, password, role, location
- **Equipment** – name, category, rentPerDay, images, location, rating
- **Rental** – equipment, renter, dates, totalPrice, status
- **Product** – name, price, category, ownerId
- **Order** – products, userId, totalAmount, shippingAddress

---

## 🔧 Environment Variables

**Backend .env:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/agriconnect
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=your_key
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## 📝 License

MIT License - Free to use and modify

---

## 📧 Contact

For issues or questions, open a GitHub issue or contact the team.



