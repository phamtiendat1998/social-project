import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveTabComponent } from './interactive-tab.component';

describe('InteractiveTabComponent', () => {
  let component: InteractiveTabComponent;
  let fixture: ComponentFixture<InteractiveTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
