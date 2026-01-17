import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropRecommendComponent } from './crop-recommend.component';

describe('CropRecommendComponent', () => {
  let component: CropRecommendComponent;
  let fixture: ComponentFixture<CropRecommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropRecommendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
