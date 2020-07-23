import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailAlbumComponent } from './video-detail-album.component';

describe('VideoDetailAlbumComponent', () => {
  let component: VideoDetailAlbumComponent;
  let fixture: ComponentFixture<VideoDetailAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDetailAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetailAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
