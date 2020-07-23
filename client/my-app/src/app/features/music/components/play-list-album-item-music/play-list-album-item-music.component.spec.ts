import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListAlbumItemMusicComponent } from './play-list-album-item-music.component';

describe('PlayListAlbumItemMusicComponent', () => {
  let component: PlayListAlbumItemMusicComponent;
  let fixture: ComponentFixture<PlayListAlbumItemMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayListAlbumItemMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayListAlbumItemMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
