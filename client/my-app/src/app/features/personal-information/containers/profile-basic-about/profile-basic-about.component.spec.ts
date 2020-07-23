import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBasicAboutComponent } from './profile-basic-about.component';

describe('ProfileBasicAboutComponent', () => {
  let component: ProfileBasicAboutComponent;
  let fixture: ComponentFixture<ProfileBasicAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBasicAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBasicAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
