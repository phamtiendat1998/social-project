import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateStoryComponent } from './dialog-create-story.component';

describe('DialogCreateStoryComponent', () => {
  let component: DialogCreateStoryComponent;
  let fixture: ComponentFixture<DialogCreateStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
