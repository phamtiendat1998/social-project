import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSongMusicComponent } from './preview-song-music.component';

describe('PreviewSongMusicComponent', () => {
  let component: PreviewSongMusicComponent;
  let fixture: ComponentFixture<PreviewSongMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewSongMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewSongMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
