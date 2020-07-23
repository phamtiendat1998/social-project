import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPostViewComponent } from './dialog-post-view.component';

describe('DialogPostViewComponent', () => {
  let component: DialogPostViewComponent;
  let fixture: ComponentFixture<DialogPostViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPostViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
