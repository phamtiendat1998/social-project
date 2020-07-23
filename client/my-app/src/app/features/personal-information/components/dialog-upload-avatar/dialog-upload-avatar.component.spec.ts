import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadAvatarComponent } from './dialog-upload-avatar.component';

describe('DialogUploadAvatarComponent', () => {
  let component: DialogUploadAvatarComponent;
  let fixture: ComponentFixture<DialogUploadAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUploadAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUploadAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
