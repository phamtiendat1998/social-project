import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSharePostComponent } from './dialog-share-post.component';

describe('DialogSharePostComponent', () => {
  let component: DialogSharePostComponent;
  let fixture: ComponentFixture<DialogSharePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSharePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSharePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
