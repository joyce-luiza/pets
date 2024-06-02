export default class Pagination {
  constructor({
    page = null,
    size = null,
    isPaginated = page && size ? true : false,
    conditions = {},
  } = {}) {
    this.page = Number(page);
    this.size = Number(size);
    this.isPaginated = isPaginated;
    this.conditions = conditions;
  }
}
