import { initializeDatabase } from "../../config/db.js";

const invoices = "Invoices";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(
      `SELECT InvoiceId, CustomerId, EmployeeId, OrderDate, RequiredDate, ShippedDate, Status, PaymentStatus, ShipmentStatus, Subtotal, DiscountAmount, TaxAmount, ShippingFee, TotalAmount, ShippingName, ShippingPhone, ShippingAddress, ShippingCity, ShippingCountry, Note, CreatedAt, UpdatedAt FROM ${invoices}`,
    );
    return rows;
  } catch (error) {
    console.error("SQL Error in findAll:", error.message || error);
    throw error;
  }
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT InvoiceId, CustomerId, EmployeeId, OrderDate, RequiredDate, ShippedDate, Status, PaymentStatus, ShipmentStatus, Subtotal, DiscountAmount, TaxAmount, ShippingFee, TotalAmount, ShippingName, ShippingPhone, ShippingAddress, ShippingCity, ShippingCountry, Note, CreatedAt, UpdatedAt FROM ${invoices} WHERE InvoiceId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const create = async (invoiceParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${invoices} (CustomerId, EmployeeId, OrderDate, RequiredDate, ShippedDate, Status, PaymentStatus, ShipmentStatus, Subtotal, DiscountAmount, TaxAmount, ShippingFee, TotalAmount, ShippingName, ShippingPhone, ShippingAddress, ShippingCity, ShippingCountry, Note, CreatedAt, UpdatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    invoiceParams,
  );
  return result.insertId;
};

export const updateById = async (id, invoiceParams) => {
  const pool = await initializeDatabase();
  const params = [...invoiceParams, id];
  const [result] = await pool.execute(
    `UPDATE ${invoices} SET CustomerId = ?, EmployeeId = ?, OrderDate = ?, RequiredDate = ?, ShippedDate = ?, Status = ?, PaymentStatus = ?, ShipmentStatus = ?, Subtotal = ?, DiscountAmount = ?, TaxAmount = ?, ShippingFee = ?, TotalAmount = ?, ShippingName = ?, ShippingPhone = ?, ShippingAddress = ?, ShippingCity = ?, ShippingCountry = ?, Note = ?, CreatedAt = ?, UpdatedAt = ? WHERE InvoiceId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${invoices} WHERE InvoiceId = ?`,
    [id],
  );
  return result.affectedRows;
};
