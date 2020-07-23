import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSongItemMusicComponent } from './top-song-item-music.component';

describe('TopSongItemMusicComponent', () => {
  let component: TopSongItemMusicComponent;
  let fixture: ComponentFixture<TopSongItemMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSongItemMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSongItemMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
