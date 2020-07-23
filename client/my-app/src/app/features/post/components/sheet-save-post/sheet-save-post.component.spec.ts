import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetSavePostComponent } from './sheet-save-post.component';

describe('SheetSavePostComponent', () => {
  let component: SheetSavePostComponent;
  let fixture: ComponentFixture<SheetSavePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetSavePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetSavePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
