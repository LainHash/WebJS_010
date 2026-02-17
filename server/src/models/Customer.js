export default class Customer {
  Id;
  Code;
  AccountId;
  Lastname;
  Firstname;
  Gender;
  Birthday;
  City;
  Country;
  Address;
  Phone;
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
    city,
    country,
    address,
    phone,
    createdAt,
    updatedAt,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.AccountId = accountId;
    this.Lastname = lastname;
    this.Firstname = firstname;
    this.Gender = gender;
    this.Birthday = birthday;
    this.City = city;
    this.Country = country;
    this.Address = address;
    this.Phone = phone;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Customer({
      id: row.CustomerId,
      code: row.CustomerCode,
      accountId: row.AccountId,
      lastname: row.Lastname,
      firstname: row.Firstname,
      gender: row.Gender,
      Birthday: row.Birthday,
      City: row.City,
      country: row.Country,
      address: row.Address,
      phone: row.Phone,
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
      this.City,
      this.Country,
      this.Address,
      this.Phone,
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
      this.City,
      this.Country,
      this.Address,
      this.Phone,
      this.CreatedAt,
      this.UpdatedAt,
      this.Id,
    ];
  }
}
