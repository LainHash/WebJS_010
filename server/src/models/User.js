export default class User {
  Id;
  Code;
  Username;
  PasswordHash;
  Role;
  IsActive;
  CreatedAt;
  UpdatedAt;

  constructor({
    id,
    code,
    username,
    passwordHash,
    role = "customer",
    isActive = true,
    createdAt = null,
    updatedAt = null,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.Username = username;
    this.PasswordHash = passwordHash;
    this.Role = role;
    this.IsActive = isActive;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }

  static fromDb(row) {
    if (!row) return null;
    return new User({
      id: row.AccountId,
      code: row.AccountCode,
      username: row.Username,
      passwordHash: row.PasswordHash,
      role: row.Role,
      isActive: row.IsActive,
      createdAt: row.CreatedAt,
      updatedAt: row.UpdatedAt,
    });
  }

  toInsertParams() {
    return [
      this.Username,
      this.PasswordHash,
      this.Role,
      this.IsActive,
      this.CreatedAt,
      this.UpdatedAt,
    ];
  }

  toUpdateParams() {
    return [
      this.Username,
      this.PasswordHash,
      this.Role,
      this.IsActive,
      this.CreatedAt,
      this.UpdatedAt,
    ];
  }

  validate() {
    return [];
  }
}
