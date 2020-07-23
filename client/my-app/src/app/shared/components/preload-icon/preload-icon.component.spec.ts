import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadIconComponent } from './preload-icon.component';

describe('PreloadIconComponent', () => {
  let component: PreloadIconComponent;
  let fixture: ComponentFixture<PreloadIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
