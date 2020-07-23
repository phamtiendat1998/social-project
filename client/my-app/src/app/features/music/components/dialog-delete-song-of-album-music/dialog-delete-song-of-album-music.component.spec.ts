import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteSongOfAlbumMusicComponent } from './dialog-delete-song-of-album-music.component';

describe('DialogDeleteSongOfAlbumMusicComponent', () => {
  let component: DialogDeleteSongOfAlbumMusicComponent;
  let fixture: ComponentFixture<DialogDeleteSongOfAlbumMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteSongOfAlbumMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteSongOfAlbumMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
