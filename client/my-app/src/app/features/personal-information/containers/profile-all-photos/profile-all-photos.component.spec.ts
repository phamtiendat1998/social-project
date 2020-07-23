import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAllPhotosComponent } from './profile-all-photos.component';

describe('ProfileAllPhotosComponent', () => {
  let component: ProfileAllPhotosComponent;
  let fixture: ComponentFixture<ProfileAllPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAllPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAllPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
