import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumVideoComponent } from './album-video.component';

describe('AlbumVideoComponent', () => {
  let component: AlbumVideoComponent;
  let fixture: ComponentFixture<AlbumVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
