import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFieldComponent } from './work-field.component';

describe('WorkFieldComponent', () => {
  let component: WorkFieldComponent;
  let fixture: ComponentFixture<WorkFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
