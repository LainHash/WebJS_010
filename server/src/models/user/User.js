export default class User {
  Id;
  Code;
  Username;
  Email;
  PasswordHash;
  Balance = 0;
  RoleId = 1;
  IsActive = true;
  CreatedAt = null;
  UpdatedAt = null;

  constructor({
    id,
    code,
    username,
    email,
    passwordHash,
    balance,
    roleId = 1,
    isActive = true,
    createdAt = null,
    updatedAt = null,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.Username = username;
    this.Email = email;
    this.PasswordHash = passwordHash;
    this.Balance = balance ?? 0;
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
      balance: row.Balance,
      roleId: row.RoleId,
      isActive: row.IsActive,
      createdAt: row.CreatedAt,
      updatedAt: row.UpdatedAt,
    });
  }

  toInsertParams() {
    return [
      this.Code,
      this.Username,
      this.Email,
      this.PasswordHash,
      this.Balance,
      this.RoleId,
      this.IsActive,
      this.CreatedAt,
      this.UpdatedAt,
    ];
  }

  toUpdateParams() {
    return [
      this.Username,
      this.Email,
      this.PasswordHash,
      this.Balance,
      this.RoleId,
      this.IsActive,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }

  validate() {
    const errors = [];
    if (!this.Username || !this.Username.trim()) {
      errors.push({ field: "Username", message: "Username is required" });
    }
    if (!this.Email || !this.Email.trim()) {
      errors.push({ field: "Email", message: "Email is required" });
    } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(this.Email)) {
      errors.push({ field: "Email", message: "Email is invalid" });
    }
    if (!this.PasswordHash) {
      errors.push({ field: "Password", message: "Password is required" });
    }
    // Balance should be numeric and non-negative
    if (
      this.Balance == null ||
      isNaN(this.Balance) ||
      Number(this.Balance) < 0
    ) {
      errors.push({
        field: "Balance",
        message: "Balance must be a non-negative number",
      });
    }
    return errors;
  }
}
