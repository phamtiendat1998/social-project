import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteAlbumComponent } from './dialog-delete-album.component';

describe('DialogDeleteAlbumComponent', () => {
  let component: DialogDeleteAlbumComponent;
  let fixture: ComponentFixture<DialogDeleteAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
