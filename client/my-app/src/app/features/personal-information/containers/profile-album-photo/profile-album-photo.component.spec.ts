import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAlbumPhotoComponent } from './profile-album-photo.component';

describe('ProfileAlbumPhotoComponent', () => {
  let component: ProfileAlbumPhotoComponent;
  let fixture: ComponentFixture<ProfileAlbumPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAlbumPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAlbumPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
