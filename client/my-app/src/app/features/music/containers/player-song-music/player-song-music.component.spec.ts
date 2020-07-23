import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSongMusicComponent } from './player-song-music.component';

describe('PlayerSongMusicComponent', () => {
  let component: PlayerSongMusicComponent;
  let fixture: ComponentFixture<PlayerSongMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerSongMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSongMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
