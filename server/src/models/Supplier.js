export default class Supplier {
  Id;
  Code;
  CompanyName;
  ContactName;
  Country;
  Phone;
  Fax;

  constructor({
    id,
    code,
    companyName,
    contactName,
    country,
    phone,
    fax,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.CompanyName = companyName;
    this.ContactName = contactName;
    this.Country = country;
    this.Phone = phone;
    this.Fax = fax;
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
    });
  }

  toInsertParams() {
    return [
      this.CompanyName,
      this.ContactName,
      this.Country,
      this.Phone,
      this.Fax,
    ];
  }

  toUpdateParams() {
    return [
      this.CompanyName,
      this.ContactName,
      this.Country,
      this.Phone,
      this.Fax,
    ];
  }

  validate() {
    return [];
  }
}
