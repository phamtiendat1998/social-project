import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePhotoDetailAlbumComponent } from './profile-photo-detail-album.component';

describe('ProfilePhotoDetailAlbumComponent', () => {
  let component: ProfilePhotoDetailAlbumComponent;
  let fixture: ComponentFixture<ProfilePhotoDetailAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePhotoDetailAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePhotoDetailAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
