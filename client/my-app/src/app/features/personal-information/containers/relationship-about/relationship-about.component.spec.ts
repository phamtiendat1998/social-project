import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipAboutComponent } from './relationship-about.component';

describe('RelationshipAboutComponent', () => {
  let component: RelationshipAboutComponent;
  let fixture: ComponentFixture<RelationshipAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
