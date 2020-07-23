import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAlbumItemMusicComponent } from './top-album-item-music.component';

describe('TopAlbumItemMusicComponent', () => {
  let component: TopAlbumItemMusicComponent;
  let fixture: ComponentFixture<TopAlbumItemMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAlbumItemMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAlbumItemMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
