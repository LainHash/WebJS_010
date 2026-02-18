export default class Category {
  Id;
  Code;
  Name;
  Description;
  CreatedAt = null;
  UpdatedAt = null;

  constructor({
    id,
    code,
    name,
    description,
    createdAt = null,
    updatedAt = null,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.Name = name;
    this.Description = description;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Category({
      id: row.CategoryId,
      code: row.CategoryCode,
      name: row.CategoryName,
      description: row.Description,
      createdAt: row.CreatedAt,
      updatedAt: row.UpdatedAt,
    });
  }

  toInsertParams() {
    return [
      this.Name,
      this.Description,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }

  toUpdateParams() {
    return [
      this.Name,
      this.Description,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }

  validate() {
    return [];
  }
}
