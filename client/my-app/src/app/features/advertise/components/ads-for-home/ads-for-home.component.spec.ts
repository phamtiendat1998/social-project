import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsForHomeComponent } from './ads-for-home.component';

describe('AdsForHomeComponent', () => {
  let component: AdsForHomeComponent;
  let fixture: ComponentFixture<AdsForHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsForHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsForHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
