import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventForHomeComponent } from './event-for-home.component';

describe('EventForHomeComponent', () => {
  let component: EventForHomeComponent;
  let fixture: ComponentFixture<EventForHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventForHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventForHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
