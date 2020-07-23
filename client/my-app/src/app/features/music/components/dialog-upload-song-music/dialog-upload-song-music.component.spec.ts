import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadSongMusicComponent } from './dialog-upload-song-music.component';

describe('DialogUploadSongMusicComponent', () => {
  let component: DialogUploadSongMusicComponent;
  let fixture: ComponentFixture<DialogUploadSongMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUploadSongMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUploadSongMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
