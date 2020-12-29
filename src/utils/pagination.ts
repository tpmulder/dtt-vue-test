export class PagedList<T> implements PagedListParameters {
  totalItems: number;
  items: T[];
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortOrder?: string;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;

  constructor(source: T[], params?: PagedListParameters) {
    this.totalItems = source.length;
    this.pageSize = params?.pageSize || 10;
    this.pageNumber = params?.pageNumber || 1;
    this.totalPages = this.totalItems / this.pageSize;
    this.hasNext = this.totalPages > this.pageNumber;
    this.hasPrevious = this.pageNumber > 1;
    this.sortBy = params?.sortBy;
    this.sortOrder = params?.sortOrder;

    let items = source;

    // Simple sorting algorithm working for strings & numbers
    const sortBy = this.sortBy;
    if (sortBy) {
      let arr = [1, -1];
      if (this.sortOrder === "desc") arr = arr.reverse();
      items = source.sort((a: any, b: any) =>
        a[sortBy]?.trim() > b[sortBy]?.trim()
          ? arr[0]
          : b[sortBy]?.trim() > a[sortBy]?.trim()
          ? arr[1]
          : 0
      );
    }

    // Pagination
    this.items = items.slice(
      (this.pageNumber - 1) * this.pageSize,
      this.pageSize * this.pageNumber
    );
  }
}

export interface PagedListParameters {
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortOrder?: string;
}
