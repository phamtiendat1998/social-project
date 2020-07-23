import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSongMusicComponent } from './user-song-music.component';

describe('UserSongMusicComponent', () => {
  let component: UserSongMusicComponent;
  let fixture: ComponentFixture<UserSongMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSongMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSongMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
