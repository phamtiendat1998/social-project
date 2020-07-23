import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadCoverComponent } from './dialog-upload-cover.component';

describe('DialogUploadCoverComponent', () => {
  let component: DialogUploadCoverComponent;
  let fixture: ComponentFixture<DialogUploadCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUploadCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUploadCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
