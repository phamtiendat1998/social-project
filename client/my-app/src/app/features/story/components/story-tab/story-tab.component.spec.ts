import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTabComponent } from './story-tab.component';

describe('StoryTabComponent', () => {
  let component: StoryTabComponent;
  let fixture: ComponentFixture<StoryTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
