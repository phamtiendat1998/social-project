import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadAlbumPhotoComponent } from './dialog-upload-album-photo.component';

describe('DialogUploadAlbumPhotoComponent', () => {
  let component: DialogUploadAlbumPhotoComponent;
  let fixture: ComponentFixture<DialogUploadAlbumPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUploadAlbumPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUploadAlbumPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
