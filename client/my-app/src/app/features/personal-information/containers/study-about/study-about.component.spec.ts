import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAboutComponent } from './study-about.component';

describe('StudyAboutComponent', () => {
  let component: StudyAboutComponent;
  let fixture: ComponentFixture<StudyAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
