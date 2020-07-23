import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAboutComponent } from './live-about.component';

describe('LiveAboutComponent', () => {
  let component: LiveAboutComponent;
  let fixture: ComponentFixture<LiveAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
