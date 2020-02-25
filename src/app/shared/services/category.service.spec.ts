import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';

describe('CateoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });
});
