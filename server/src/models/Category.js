export default class Category {
  constructor({ Id, Code, Name, Description } = {}) {
    this.Id = Id;
    this.Code = Code;
    this.Name = Name;
    this.Description = Description;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Category({
      Id: row.CategoryId,
      Code: row.CategoryCode,
      Name: row.CategoryName,
      Description: row.Description,
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
