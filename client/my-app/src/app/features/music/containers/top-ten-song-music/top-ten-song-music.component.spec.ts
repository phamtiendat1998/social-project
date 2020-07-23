import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTenSongMusicComponent } from './top-ten-song-music.component';

describe('TopTenSongMusicComponent', () => {
  let component: TopTenSongMusicComponent;
  let fixture: ComponentFixture<TopTenSongMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopTenSongMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTenSongMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
