import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMembersComponent } from './dialog-members.component';

describe('DialogMembersComponent', () => {
  let component: DialogMembersComponent;
  let fixture: ComponentFixture<DialogMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
