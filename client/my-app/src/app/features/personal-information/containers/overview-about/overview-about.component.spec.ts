import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewAboutComponent } from './overview-about.component';

describe('OverviewAboutComponent', () => {
  let component: OverviewAboutComponent;
  let fixture: ComponentFixture<OverviewAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
