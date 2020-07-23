import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWorkAboutComponent } from './profile-work-about.component';

describe('ProfileWorkAboutComponent', () => {
  let component: ProfileWorkAboutComponent;
  let fixture: ComponentFixture<ProfileWorkAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileWorkAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileWorkAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
