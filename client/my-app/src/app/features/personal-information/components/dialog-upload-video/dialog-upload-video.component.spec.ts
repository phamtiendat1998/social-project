import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadVideoComponent } from './dialog-upload-video.component';

describe('DialogUploadVideoComponent', () => {
  let component: DialogUploadVideoComponent;
  let fixture: ComponentFixture<DialogUploadVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUploadVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUploadVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
