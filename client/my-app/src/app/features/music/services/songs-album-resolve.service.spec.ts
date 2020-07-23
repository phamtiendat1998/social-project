import { TestBed } from '@angular/core/testing';

import { SongsAlbumResolveService } from './songs-album-resolve.service';

describe('SongsAlbumResolveService', () => {
  let service: SongsAlbumResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongsAlbumResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
