import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTenAlbumMusicComponent } from './top-ten-album-music.component';

describe('TopTenAlbumMusicComponent', () => {
  let component: TopTenAlbumMusicComponent;
  let fixture: ComponentFixture<TopTenAlbumMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopTenAlbumMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTenAlbumMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
