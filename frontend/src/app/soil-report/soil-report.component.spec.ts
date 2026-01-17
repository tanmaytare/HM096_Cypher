import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilReportComponent } from './soil-report.component';

describe('SoilReportComponent', () => {
  let component: SoilReportComponent;
  let fixture: ComponentFixture<SoilReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoilReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoilReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
