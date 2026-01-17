import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-soil-report',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './soil-report.component.html',
  styleUrl: './soil-report.component.scss'
})
export class SoilReportComponent {
  soilType = '';
  report: any = null;

  generateReport() {
    const map: any = {
      Black: { N: 250, P: 20, K: 200, pH: 6.5 },
      Red: { N: 150, P: 15, K: 150, pH: 5.8 },
      Loamy: { N: 200, P: 18, K: 180, pH: 6.0 },
      Clay: { N: 180, P: 14, K: 160, pH: 5.5 },
      Sandy: { N: 120, P: 10, K: 100, pH: 5.0 }
    };
    this.report = map[this.soilType];
  }
}
