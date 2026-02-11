export default class Supplier {
  Id;
  Code;
  CompanyName;
  ContactName;
  Country;
  Phone;
  Fax;
  CreatedAt = null;
  UpdatedAt = null;

  constructor({
    id,
    code,
    companyName,
    contactName,
    country,
    phone,
    fax,
    createdAt = null,
    updatedAt = null,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.CompanyName = companyName;
    this.ContactName = contactName;
    this.Country = country;
    this.Phone = phone;
    this.Fax = fax;
    this.CreatedAt = createdAt;
    this.UpdatedAt = updatedAt;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Supplier({
      id: row.SupplierId,
      code: row.SupplierCode,
      companyName: row.CompanyName,
      contactName: row.ContactName,
      country: row.Country,
      phone: row.Phone,
      fax: row.Fax,
      createdAt: row.CreatedAt,
      updatedAt: row.UpdatedAt,
    });
  }

  toInsertParams() {
    return [
      this.CompanyName,
      this.ContactName,
      this.Country,
      this.Phone,
      this.Fax,
      this.CreatedAt,
      this.UpdatedAt,
    ];
  }

  toUpdateParams() {
    return [
      this.CompanyName,
      this.ContactName,
      this.Country,
      this.Phone,
      this.Fax,
      this.CreatedAt,
      this.UpdatedAt,
    ];
  }

  validate() {
    return [];
  }
}
