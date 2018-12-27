import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  public pageNumber = 0;

  private _contentLength: number;
  private _pageSize: number;

  @Input()
  set contentLength(length: number) {
    this._contentLength = length;
    this.handlePageConstraintChange();
  }
  get contentLength() {
    return this._contentLength;
  }

  @Input()
  set pageSize(size: any) {
    this._pageSize = parseInt(size, 10);
    this.handlePageConstraintChange();
  }
  get pageSize() {
    return this._pageSize;
  }

  @Output() public pageChange: EventEmitter<number>;

  constructor() {
    this.pageChange = new EventEmitter<number>(true);
  }

  ngOnInit() {
  }

  getMaxPages() {
    if (!this.contentLength) {
      return 0;
    }
    return Math.ceil(this.contentLength / this.pageSize);
  }

  handlePageConstraintChange() {
    if (!this.contentLength || !this.pageSize) {
      return;
    }
    if (this.isPageOverflowing()) {
      this.setPageNumber(this.getMaxPages() - 1);
    }
  }

  private isPageOverflowing() {
    return this.pageNumber >= this.getMaxPages();
  }

  setPageNumber(num: number) {
    this.pageNumber = num;
    this.pageChange.emit(num);
  }

}
