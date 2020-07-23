import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnDetailAlbumMusicComponent } from './own-detail-album-music.component';

describe('OwnDetailAlbumMusicComponent', () => {
  let component: OwnDetailAlbumMusicComponent;
  let fixture: ComponentFixture<OwnDetailAlbumMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnDetailAlbumMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnDetailAlbumMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
