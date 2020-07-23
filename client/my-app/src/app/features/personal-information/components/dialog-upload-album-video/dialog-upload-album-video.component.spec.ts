import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadAlbumVideoComponent } from './dialog-upload-album-video.component';

describe('DialogUploadAlbumVideoComponent', () => {
  let component: DialogUploadAlbumVideoComponent;
  let fixture: ComponentFixture<DialogUploadAlbumVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUploadAlbumVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUploadAlbumVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
