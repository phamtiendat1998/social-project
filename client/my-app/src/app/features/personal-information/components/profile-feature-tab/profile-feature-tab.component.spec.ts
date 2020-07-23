import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFeatureTabComponent } from './profile-feature-tab.component';

describe('ProfileFeatureTabComponent', () => {
  let component: ProfileFeatureTabComponent;
  let fixture: ComponentFixture<ProfileFeatureTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFeatureTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFeatureTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
