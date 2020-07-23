import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipFieldComponent } from './relationship-field.component';

describe('RelationshipFieldComponent', () => {
  let component: RelationshipFieldComponent;
  let fixture: ComponentFixture<RelationshipFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
