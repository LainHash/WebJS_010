import { initializeDatabase } from "../config/db.js";

const customerTable = "Customers";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(`SELECT * FROM \`${customerTable}\``);
    return rows;
  } catch (error) {
    console.error("SQL Error in findAll:", error.message || error);
    throw error;
  }
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT * FROM ${customerTable} WHERE CustomerId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const create = async (customerParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${customerTable} (AccountId, Lastname, Firstname, Gender, Birthday, City, Country, Address, Phone, CreatedAt, UpdatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    customerParams,
  );
  return result.insertId;
};

export const updateById = async (id, customerParams) => {
  const pool = await initializeDatabase();
  const params = [...customerParams, id];
  const [result] = await pool.execute(
    `UPDATE ${customerTable} SET AccountId = ?, Lastname = ?, Firstname = ?, Gender = ?, Birthday = ?, City = ?, Country = ?, Address = ?, Phone = ?, CreatedAt = ?, UpdatedAt = ? WHERE CustomerId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${customerTable} WHERE CustomerId = ?`,
    [id],
  );
  return result.affectedRows;
};
