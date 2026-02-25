import { initializeDatabase } from "../../config/db.js";

const payments = "Payments";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(
      `SELECT PaymentId, InvoiceId, PaymentMethod, PaymentProvider, TransactionId, Amount, Currency, Status, PaidAt, CreatedAt, UpdatedAt FROM ${payments}`,
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
    `SELECT PaymentId, InvoiceId, PaymentMethod, PaymentProvider, TransactionId, Amount, Currency, Status, PaidAt, CreatedAt, UpdatedAt FROM ${payments} WHERE PaymentId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const findByInvoiceId = async (invoiceId) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT PaymentId, InvoiceId, PaymentMethod, PaymentProvider, TransactionId, Amount, Currency, Status, PaidAt, CreatedAt, UpdatedAt FROM ${payments} WHERE InvoiceId = ?`,
    [invoiceId],
  );
  return rows;
};

export const create = async (paymentParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${payments} (InvoiceId, PaymentMethod, PaymentProvider, TransactionId, Amount, Currency, Status, PaidAt, CreatedAt, UpdatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    paymentParams,
  );
  return result.insertId;
};

export const updateById = async (id, paymentParams) => {
  const pool = await initializeDatabase();
  const params = [...paymentParams, id];
  const [result] = await pool.execute(
    `UPDATE ${payments} SET InvoiceId = ?, PaymentMethod = ?, PaymentProvider = ?, TransactionId = ?, Amount = ?, Currency = ?, Status = ?, PaidAt = ?, CreatedAt = ?, UpdatedAt = ? WHERE PaymentId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${payments} WHERE PaymentId = ?`,
    [id],
  );
  return result.affectedRows;
};
