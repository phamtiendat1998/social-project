import { TestBed } from '@angular/core/testing';

import { DetailAlbumResolveService } from './detail-album-resolve.service';

describe('DetailAlbumResolveService', () => {
  let service: DetailAlbumResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailAlbumResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
