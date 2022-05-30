import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStatComponent } from './add-edit-stat.component';

describe('AddEditStatComponent', () => {
  let component: AddEditStatComponent;
  let fixture: ComponentFixture<AddEditStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
