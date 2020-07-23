import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetReportPostComponent } from './sheet-report-post.component';

describe('SheetReportPostComponent', () => {
  let component: SheetReportPostComponent;
  let fixture: ComponentFixture<SheetReportPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetReportPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetReportPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
