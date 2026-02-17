import { initializeDatabase } from "../config/db.js";

const invoiceDetails = "InvoiceDetails";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(`SELECT * FROM ${invoiceDetails}`);
    return rows;
  } catch (error) {
    console.error("SQL Error in findAll:", error.message || error);
    throw error;
  }
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT * FROM ${invoiceDetails} WHERE InvoiceDetailId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const findByInvoiceId = async (invoiceId) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT * FROM ${invoiceDetails} WHERE InvoiceId = ?`,
    [invoiceId],
  );
  return rows;
};

export const create = async (detailParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${invoiceDetails} (InvoiceId, ProductType, ProductId, ProductName, UnitPrice, Quantity, DiscountPercent, LineTotal, CreatedAt, UpdatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    detailParams,
  );
  return result.insertId;
};

export const updateById = async (id, detailParams) => {
  const pool = await initializeDatabase();
  const params = [...detailParams, id];
  const [result] = await pool.execute(
    `UPDATE ${invoiceDetails} SET InvoiceId = ?, ProductType = ?, ProductId = ?, ProductName = ?, UnitPrice = ?, Quantity = ?, DiscountPercent = ?, LineTotal = ?, CreatedAt = ?, UpdatedAt = ? WHERE InvoiceDetailId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${invoiceDetails} WHERE InvoiceDetailId = ?`,
    [id],
  );
  return result.affectedRows;
};
