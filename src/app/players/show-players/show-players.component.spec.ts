import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlayersComponent } from './show-players.component';

describe('ShowPlayersComponent', () => {
  let component: ShowPlayersComponent;
  let fixture: ComponentFixture<ShowPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
