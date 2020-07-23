import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStoryViewComponent } from './dialog-story-view.component';

describe('DialogStoryViewComponent', () => {
  let component: DialogStoryViewComponent;
  let fixture: ComponentFixture<DialogStoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
