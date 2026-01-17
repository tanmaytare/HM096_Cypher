import { Component } from '@angular/core';
import { MlService } from '../ml.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disease-detect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disease-detect.component.html',
  styleUrl: './disease-detect.component.scss'
})
export class DiseaseDetectComponent {
  file: File | null = null;
  result: any = null;

  constructor(private mlService: MlService) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  submit() {
    if (this.file) {
      this.mlService.detectDisease(this.file).subscribe(res => this.result = res);
    }
  }
}
