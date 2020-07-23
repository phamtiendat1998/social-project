import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureTabComponent } from './picture-tab.component';

describe('PictureTabComponent', () => {
  let component: PictureTabComponent;
  let fixture: ComponentFixture<PictureTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
