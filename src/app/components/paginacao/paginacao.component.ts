import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent {
  @Input() currentPage: number;
  @Input() pageSize: number;
  @Input() totalElements: number;
  @Output() pageChanged = new EventEmitter<number>();
  @Output() pageSizeChanged = new EventEmitter<number>();

  getVisiblePageIndexes(): number[] {
    const totalPages = Math.ceil(this.totalElements / this.pageSize);
    const startPage = Math.max(0, this.currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPages - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }

  changePage(page: number) {
    this.pageChanged.emit(page);
  }

  changePageSize(pageSize: number) {
    this.pageSizeChanged.emit(pageSize);
  }
}
