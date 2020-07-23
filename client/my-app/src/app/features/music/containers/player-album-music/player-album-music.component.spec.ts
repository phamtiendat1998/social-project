import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAlbumMusicComponent } from './player-album-music.component';

describe('PlayerAlbumMusicComponent', () => {
  let component: PlayerAlbumMusicComponent;
  let fixture: ComponentFixture<PlayerAlbumMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAlbumMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAlbumMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
