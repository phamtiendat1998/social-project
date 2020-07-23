import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStudyAboutComponent } from './profile-study-about.component';

describe('ProfileStudyAboutComponent', () => {
  let component: ProfileStudyAboutComponent;
  let fixture: ComponentFixture<ProfileStudyAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStudyAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStudyAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
