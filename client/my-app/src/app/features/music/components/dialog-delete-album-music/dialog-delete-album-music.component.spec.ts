import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteAlbumMusicComponent } from './dialog-delete-album-music.component';

describe('DialogDeleteAlbumMusicComponent', () => {
  let component: DialogDeleteAlbumMusicComponent;
  let fixture: ComponentFixture<DialogDeleteAlbumMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteAlbumMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteAlbumMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
