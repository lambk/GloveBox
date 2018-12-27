import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { RangePipe } from 'src/app/util/range-pipe';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaginationComponent,
        RangePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 0 max pages when content length is 0', () => {
    component.contentLength = 0;
    component.pageSize = 5;

    expect(component.getMaxPages()).toBe(0);
  });

  it('should return correct max pages for nonzero content lengths', () => {
    component.contentLength = 12;
    component.pageSize = 5;

    expect(component.getMaxPages()).toBe(3);
  });

  it('should return correct max pages when content length is a multiple of page size', () => {
    component.contentLength = 10;
    component.pageSize = 5;

    expect(component.getMaxPages()).toBe(2);
  });

  it('should resolve page overflows after a change to content length', () => {
    component.pageNumber = 3;
    component.pageSize = 5;

    component.contentLength = 10;

    expect(component.pageNumber).toBe(1);
  });

  it('should emit the new page number on page change', () => {
    spyOn(component.pageChange, 'emit');
    component.setPageNumber(3);
    expect(component.pageChange.emit).toHaveBeenCalledWith(3);
  });
});
