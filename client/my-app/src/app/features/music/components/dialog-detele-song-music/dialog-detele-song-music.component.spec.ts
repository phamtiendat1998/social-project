import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeteleSongMusicComponent } from './dialog-detele-song-music.component';

describe('DialogDeteleSongMusicComponent', () => {
  let component: DialogDeteleSongMusicComponent;
  let fixture: ComponentFixture<DialogDeteleSongMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeteleSongMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeteleSongMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
