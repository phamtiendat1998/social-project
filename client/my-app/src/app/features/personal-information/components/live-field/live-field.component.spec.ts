import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveFieldComponent } from './live-field.component';

describe('LiveFieldComponent', () => {
  let component: LiveFieldComponent;
  let fixture: ComponentFixture<LiveFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
