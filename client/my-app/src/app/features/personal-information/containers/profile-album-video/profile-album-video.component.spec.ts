import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAlbumVideoComponent } from './profile-album-video.component';

describe('ProfileAlbumVideoComponent', () => {
  let component: ProfileAlbumVideoComponent;
  let fixture: ComponentFixture<ProfileAlbumVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAlbumVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAlbumVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
