import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSongMusicComponent } from './top-song-music.component';

describe('TopSongMusicComponent', () => {
  let component: TopSongMusicComponent;
  let fixture: ComponentFixture<TopSongMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSongMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSongMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
