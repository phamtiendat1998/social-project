import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListItemMusicComponent } from './play-list-item-music.component';

describe('PlayListItemMusicComponent', () => {
  let component: PlayListItemMusicComponent;
  let fixture: ComponentFixture<PlayListItemMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayListItemMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayListItemMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
