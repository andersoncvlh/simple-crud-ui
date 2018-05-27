export class Page<T> {
  totalElements = 0;      // Total number of items
  totalPages = 0;       // Total pages
  size = 20;   // Size per page
  number = 0; // Actual page (att: using index)
  content: Array<T> = [];  // items for the current page
}
