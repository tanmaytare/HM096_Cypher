import { Component } from '@angular/core';
import { MlService } from '../ml.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crop-recommend',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crop-recommend.component.html',
  styleUrl: './crop-recommend.component.scss'
})
export class CropRecommendComponent {
  soilType = '';
  city = '';
  result: any = null;

  constructor(private mlService: MlService) {}

  getSoilData(soil: string) {
    const map: any = {
      Black: { nitrogen: 120, phosphorous: 60, pottasium: 80, ph: 6.8, rainfall: 130 },
      Red: { nitrogen: 60, phosphorous: 40, pottasium: 50, ph: 5.8, rainfall: 90 },
      Loamy: { nitrogen: 80, phosphorous: 50, pottasium: 60, ph: 6.5, rainfall: 110 },
      Clay: { nitrogen: 100, phosphorous: 55, pottasium: 70, ph: 6.2, rainfall: 100 },
      Sandy: { nitrogen: 40, phosphorous: 25, pottasium: 30, ph: 5.5, rainfall: 70 }
    };
    return map[soil] || map['Loamy'];
  }
  


  submit() {
    const data = { ...this.getSoilData(this.soilType), city: this.city };
    this.mlService.recommendCrop(data).subscribe(res => this.result = res);
  }
}