import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateAlbumMusicComponent } from './dialog-create-album-music.component';

describe('DialogCreateAlbumMusicComponent', () => {
  let component: DialogCreateAlbumMusicComponent;
  let fixture: ComponentFixture<DialogCreateAlbumMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateAlbumMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateAlbumMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
