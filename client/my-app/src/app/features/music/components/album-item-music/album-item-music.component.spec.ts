import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumItemMusicComponent } from './album-item-music.component';

describe('AlbumItemMusicComponent', () => {
  let component: AlbumItemMusicComponent;
  let fixture: ComponentFixture<AlbumItemMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumItemMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumItemMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
