import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAboutComponent } from './basic-about.component';

describe('BasicAboutComponent', () => {
  let component: BasicAboutComponent;
  let fixture: ComponentFixture<BasicAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
