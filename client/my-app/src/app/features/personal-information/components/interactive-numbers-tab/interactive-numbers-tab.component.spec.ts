import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveNumbersTabComponent } from './interactive-numbers-tab.component';

describe('InteractiveNumbersTabComponent', () => {
  let component: InteractiveNumbersTabComponent;
  let fixture: ComponentFixture<InteractiveNumbersTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveNumbersTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveNumbersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
