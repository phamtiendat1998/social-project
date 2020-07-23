import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendMusicComponent } from './trend-music.component';

describe('TrendMusicComponent', () => {
  let component: TrendMusicComponent;
  let fixture: ComponentFixture<TrendMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
