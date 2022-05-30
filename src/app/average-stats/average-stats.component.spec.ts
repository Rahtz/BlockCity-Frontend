import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageStatsComponent } from './average-stats.component';

describe('AverageStatsComponent', () => {
  let component: AverageStatsComponent;
  let fixture: ComponentFixture<AverageStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
