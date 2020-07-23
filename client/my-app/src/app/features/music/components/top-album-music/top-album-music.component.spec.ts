import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAlbumMusicComponent } from './top-album-music.component';

describe('TopAlbumMusicComponent', () => {
  let component: TopAlbumMusicComponent;
  let fixture: ComponentFixture<TopAlbumMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAlbumMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAlbumMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
