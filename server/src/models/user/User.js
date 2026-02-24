export default class User {
  Id;
  Code;
  Username;
  Email;
  PasswordHash;
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
    roleId = 1,
    isActive = true,
    createdAt = null,
    updatedAt = null,
  } = {}) {
    this.Id = id;
    this.Code = code; // corresponds to AccountCode in the database
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
    // We now also need to supply AccountCode as the very first parameter.
    // The caller is responsible for generating a code (see authService).  The
    // remainder of the fields match the column order defined in
    // userRepo.create().
    return [
      this.Code,
      this.Username,
      this.Email,
      this.PasswordHash,
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
    return errors;
  }
}
