export default class User {
  Id;
  Code;
  Username;
  Email;
  PasswordHash;
  RoleId;
  IsActive = true;
  CreatedAt = null;
  UpdatedAt = null;

  constructor({
    id,
    code,
    username,
    email,
    passwordHash,
    roleId = 0,
    isActive = true,
    createdAt = null,
    updatedAt = null,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.Username = username;
    this.Email = email;
    this.PasswordHash = passwordHash;
    this.RoleId = roleId;
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
      email: row.Email,
      passwordHash: row.PasswordHash,
      roleId: row.RoleId,
      isActive: row.IsActive,
      createdAt: row.CreatedAt,
      updatedAt: row.UpdatedAt,
    });
  }

  toInsertParams() {
    return [
      this.Username,
      this.Email,
      this.PasswordHash,
      this.RoleId,
      this.IsActive,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }

  toUpdateParams() {
    return [
      this.Username,
      this.Email,
      this.PasswordHash,
      this.RoleId,
      this.IsActive,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }

  validate() {
    return [];
  }
}
