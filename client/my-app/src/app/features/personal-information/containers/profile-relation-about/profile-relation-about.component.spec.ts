import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRelationAboutComponent } from './profile-relation-about.component';

describe('ProfileRelationAboutComponent', () => {
  let component: ProfileRelationAboutComponent;
  let fixture: ComponentFixture<ProfileRelationAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRelationAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRelationAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
