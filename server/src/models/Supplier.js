export default class Supplier {
  constructor({
    Id,
    Code,
    CompanyName,
    ContactName,
    Country,
    Phone,
    Fax,
  } = {}) {
    this.Id = Id;
    this.Code = Code;
    this.CompanyName = CompanyName;
    this.ContactName = ContactName;
    this.Country = Country;
    this.Phone = Phone;
    this.Fax = Fax;
  }
  static fromDb(row) {
    if (!row) return null;
    return new Supplier({
      Id: row.SupplierId,
      Code: row.SupplierCode,
      CompanyName: row.CompanyName,
      ContactName: row.ContactName,
      Country: row.Country,
      Phone: row.Phone,
      Fax: row.Fax,
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
