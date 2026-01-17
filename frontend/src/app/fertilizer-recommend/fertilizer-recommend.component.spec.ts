import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizerRecommendComponent } from './fertilizer-recommend.component';

describe('FertilizerRecommendComponent', () => {
  let component: FertilizerRecommendComponent;
  let fixture: ComponentFixture<FertilizerRecommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FertilizerRecommendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FertilizerRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
