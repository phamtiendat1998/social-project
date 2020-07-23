import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostListenMusicComponent } from './most-listen-music.component';

describe('MostListenMusicComponent', () => {
  let component: MostListenMusicComponent;
  let fixture: ComponentFixture<MostListenMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostListenMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostListenMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
