import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAlbumMusicComponent } from './detail-album-music.component';

describe('DetailAlbumMusicComponent', () => {
  let component: DetailAlbumMusicComponent;
  let fixture: ComponentFixture<DetailAlbumMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAlbumMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAlbumMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
