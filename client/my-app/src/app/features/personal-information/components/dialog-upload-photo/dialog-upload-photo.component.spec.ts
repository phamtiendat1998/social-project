import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadPhotoComponent } from './dialog-upload-photo.component';

describe('DialogUploadPhotoComponent', () => {
  let component: DialogUploadPhotoComponent;
  let fixture: ComponentFixture<DialogUploadPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUploadPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUploadPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
