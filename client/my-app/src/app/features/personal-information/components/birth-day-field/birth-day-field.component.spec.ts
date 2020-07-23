import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthDayFieldComponent } from './birth-day-field.component';

describe('BirthDayFieldComponent', () => {
  let component: BirthDayFieldComponent;
  let fixture: ComponentFixture<BirthDayFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthDayFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthDayFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
