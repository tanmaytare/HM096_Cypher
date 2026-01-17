import { Component } from '@angular/core';
import { MlService } from '../ml.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fertilizer-recommend',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './fertilizer-recommend.component.html',
  styleUrl: './fertilizer-recommend.component.scss'
})
export class FertilizerRecommendComponent {
  cropname = '';
  soilType = '';
  result: any = null;

  constructor(private mlService: MlService) {}

  getSoilData(soil: string) {
    const map: any = {
      Black: { nitrogen: 198, phosphorous: 17.6, pottasium: 176 },
      Red: { nitrogen: 132, phosphorous: 19.8, pottasium: 144 },
      Loamy: { nitrogen: 165, phosphorous: 22, pottasium: 160 },
      Clay: { nitrogen: 148.5, phosphorous: 18.7, pottasium: 152 },
      Sandy: { nitrogen: 115.5, phosphorous: 13.2, pottasium: 112 }
    };
    return map[soil] || map['Loamy'];
}

  
submit() {
  const nutrients = this.getSoilData(this.soilType);
  const data = { cropname: this.cropname, ...nutrients };

  this.mlService.recommendFertilizer(data).subscribe(
    res => {
      console.log("API Response:", res);
      this.result = res;
    },
    err => {
      console.error("API Error:", err);
      this.result = { error: "Failed to fetch recommendation" };
    }
  );
}

  
}
