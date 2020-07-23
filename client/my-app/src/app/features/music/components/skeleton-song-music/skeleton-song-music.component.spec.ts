import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonSongMusicComponent } from './skeleton-song-music.component';

describe('SkeletonSongMusicComponent', () => {
  let component: SkeletonSongMusicComponent;
  let fixture: ComponentFixture<SkeletonSongMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeletonSongMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonSongMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
