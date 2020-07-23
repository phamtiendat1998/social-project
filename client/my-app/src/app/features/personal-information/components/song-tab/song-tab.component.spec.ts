import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongTabComponent } from './song-tab.component';

describe('SongTabComponent', () => {
  let component: SongTabComponent;
  let fixture: ComponentFixture<SongTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
