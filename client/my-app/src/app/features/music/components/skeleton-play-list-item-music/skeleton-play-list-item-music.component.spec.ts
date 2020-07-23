import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonPlayListItemMusicComponent } from './skeleton-play-list-item-music.component';

describe('SkeletonPlayListItemMusicComponent', () => {
  let component: SkeletonPlayListItemMusicComponent;
  let fixture: ComponentFixture<SkeletonPlayListItemMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeletonPlayListItemMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonPlayListItemMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
