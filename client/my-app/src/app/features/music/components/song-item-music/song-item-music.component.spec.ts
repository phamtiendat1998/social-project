import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongItemMusicComponent } from './song-item-music.component';

describe('SongItemMusicComponent', () => {
  let component: SongItemMusicComponent;
  let fixture: ComponentFixture<SongItemMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongItemMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongItemMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
