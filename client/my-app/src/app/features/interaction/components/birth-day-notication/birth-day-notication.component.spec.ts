import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthDayNoticationComponent } from './birth-day-notication.component';

describe('BirthDayNoticationComponent', () => {
  let component: BirthDayNoticationComponent;
  let fixture: ComponentFixture<BirthDayNoticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthDayNoticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthDayNoticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
