import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDetailAlbumComponent } from './photo-detail-album.component';

describe('PhotoDetailAlbumComponent', () => {
  let component: PhotoDetailAlbumComponent;
  let fixture: ComponentFixture<PhotoDetailAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoDetailAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoDetailAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
