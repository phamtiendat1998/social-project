import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileVideoDetailAlbumComponent } from './profile-video-detail-album.component';

describe('ProfileVideoDetailAlbumComponent', () => {
  let component: ProfileVideoDetailAlbumComponent;
  let fixture: ComponentFixture<ProfileVideoDetailAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileVideoDetailAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileVideoDetailAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
