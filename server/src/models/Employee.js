export default class Employee {
  Id;
  Code;
  AccountId;
  Lastname;
  Firstname;
  Gender;
  Birthday;
  Phone;
  Address;
  BusinessEmail;
  Department;
  Position;
  HiredDate;
  Salary;
  ManagerId;
  Status = true;
  CreatedAt = null;
  UpdatedAt = null;

  constructor({
    id,
    code,
    accountId,
    lastname,
    firstname,
    gender,
    birthday,
    phone,
    address,
    businessEmail,
    department,
    position,
    hiredDate,
    salary,
    managerId,
    status,
    createdAt = null,
    updatedAt = null,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.AccountId = accountId;
    this.Lastname = lastname;
    this.Firstname = firstname;
    this.Gender = gender;
    this.Birthday = birthday;
    this.Phone = phone;
    this.Address = address;
    this.BusinessEmail = businessEmail;
    this.Department = department;
    this.Position = position;
    this.HiredDate = hiredDate;
    this.Salary = salary;
    this.ManagerId = managerId;
    this.Status = status;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }

  static fromDb(row) {
    if (!row) return null;
    return new Employee({
      id: row.EmployeeId,
      code: row.EmployeeCode,
      accountId: row.AccountId,
      lastname: row.Lastname,
      firstname: row.Firstname,
      gender: row.Gender,
      birthday: row.Birthday,
      phone: row.Phone,
      address: row.Address,
      businessEmail: row.BusinessEmail,
      department: row.Department,
      position: row.Position,
      hiredDate: row.HiredDate,
      salary: row.Salary,
      managerId: row.ManagerId,
      status: row.Status,
      createdAt: row.CreatedAt,
      updatedAt: row.UpdatedAt,
    });
  }
  toInsertParams() {
    return [
      this.AccountId,
      this.Lastname,
      this.Firstname,
      this.Gender,
      this.Birthday,
      this.Phone,
      this.Address,
      this.BusinessEmail,
      this.Department,
      this.Position,
      this.HiredDate,
      this.Salary,
      this.ManagerId,
      this.Status,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }

  toUpdateParams() {
    return [
      this.AccountId,
      this.Lastname,
      this.Firstname,
      this.Gender,
      this.Birthday,
      this.Phone,
      this.Address,
      this.BusinessEmail,
      this.Department,
      this.Position,
      this.HiredDate,
      this.Salary,
      this.ManagerId,
      this.Status,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }
}
