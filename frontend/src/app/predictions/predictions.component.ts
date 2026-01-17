import { Component } from '@angular/core';
import { CropRecommendComponent } from "../crop-recommend/crop-recommend.component";
import { FertilizerRecommendComponent } from "../fertilizer-recommend/fertilizer-recommend.component";
import { DiseaseDetectComponent } from "../disease-detect/disease-detect.component";
import { SoilReportComponent } from "../soil-report/soil-report.component";

@Component({
  selector: 'app-predictions',
  standalone: true,
  imports: [CropRecommendComponent, FertilizerRecommendComponent, DiseaseDetectComponent, SoilReportComponent],
  templateUrl: './predictions.component.html',
  styleUrl: './predictions.component.scss'
})
export class PredictionsComponent {

}