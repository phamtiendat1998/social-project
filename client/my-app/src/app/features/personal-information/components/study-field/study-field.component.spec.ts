import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyFieldComponent } from './study-field.component';

describe('StudyFieldComponent', () => {
  let component: StudyFieldComponent;
  let fixture: ComponentFixture<StudyFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
