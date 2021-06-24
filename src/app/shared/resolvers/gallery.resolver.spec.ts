import { TestBed } from '@angular/core/testing';

import { GalleryResolver } from './gallery.resolver';

describe('GalleryResolver', () => {
  let resolver: GalleryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GalleryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
