import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAlbumMusicComponent } from './user-album-music.component';

describe('UserAlbumMusicComponent', () => {
  let component: UserAlbumMusicComponent;
  let fixture: ComponentFixture<UserAlbumMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAlbumMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAlbumMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
