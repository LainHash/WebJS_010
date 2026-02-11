export default class Category {
  Id;
  Code;
  Name;
  Description;

  constructor({ id, code, name, description } = {}) {
    this.Id = id;
    this.Code = code;
    this.Name = name;
    this.Description = description;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Category({
      id: row.CategoryId,
      code: row.CategoryCode,
      name: row.CategoryName,
      description: row.Description,
    });
  }

  toInsertParams() {
    return [this.Name, this.Description];
  }

  toUpdateParams() {
    return [this.Name, this.Description];
  }

  validate() {
    return [];
  }
}
