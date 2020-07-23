import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderFieldComponent } from './gender-field.component';

describe('GenderFieldComponent', () => {
  let component: GenderFieldComponent;
  let fixture: ComponentFixture<GenderFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
