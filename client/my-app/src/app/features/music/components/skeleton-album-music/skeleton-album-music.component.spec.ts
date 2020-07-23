import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonAlbumMusicComponent } from './skeleton-album-music.component';

describe('SkeletonAlbumMusicComponent', () => {
  let component: SkeletonAlbumMusicComponent;
  let fixture: ComponentFixture<SkeletonAlbumMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeletonAlbumMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonAlbumMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
