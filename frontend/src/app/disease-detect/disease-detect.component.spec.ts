import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseDetectComponent } from './disease-detect.component';

describe('DiseaseDetectComponent', () => {
  let component: DiseaseDetectComponent;
  let fixture: ComponentFixture<DiseaseDetectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiseaseDetectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseaseDetectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
