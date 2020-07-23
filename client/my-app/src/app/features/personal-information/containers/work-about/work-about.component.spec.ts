import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAboutComponent } from './work-about.component';

describe('WorkAboutComponent', () => {
  let component: WorkAboutComponent;
  let fixture: ComponentFixture<WorkAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
