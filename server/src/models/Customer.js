export default class Customer {
  Id;
  Code;
  Lastname;
  Firstnam;
  Gender;
  Birthday;
  City;
  Country;
  Address;
  Email;

  constructor({
    id,
    code,
    lastname,
    firstnam,
    gender,
    birthday,
    city,
    country,
    address,
    email,
  } = {}) {
    this.Id = id;
    this.Code = code;
    this.Lastname = lastname;
    this.Firstnam = firstnam;
    this.Gender = gender;
    this.Birthday = birthday;
    this.City = city;
    this.Country = country;
    this.Address = address;
    this.Email = email;
  }
}
