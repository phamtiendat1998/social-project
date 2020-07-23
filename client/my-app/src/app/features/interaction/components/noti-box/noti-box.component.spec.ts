import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiBoxComponent } from './noti-box.component';

describe('NotiBoxComponent', () => {
  let component: NotiBoxComponent;
  let fixture: ComponentFixture<NotiBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotiBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
