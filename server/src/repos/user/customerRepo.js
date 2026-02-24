import { initializeDatabase } from "../../config/db.js";

const customerTable = "Customers";

export const generateCustomerCode = async () => {
  const pool = await initializeDatabase();
  const year2 = new Date().getFullYear().toString().slice(-2);
  const prefix = `C${year2}`;
  const [rows] = await pool.execute(
    `SELECT CustomerCode FROM ${customerTable} WHERE CustomerCode LIKE ? ORDER BY CustomerId DESC LIMIT 1`,
    [`${prefix}%`],
  );
  let nextSeq = 1;
  if (rows.length) {
    const lastCode = rows[0].CustomerCode;
    const hexPart = lastCode.slice(prefix.length);
    const num = parseInt(hexPart, 16);
    if (!isNaN(num)) {
      nextSeq = num + 1;
    }
  }
  const hexseq = nextSeq.toString(16).toUpperCase();
  const padded = hexseq.padStart(5, "0");
  return prefix + padded;
};

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
    `INSERT INTO ${customerTable} (
      CustomerCode, 
      AccountId, 
      Lastname, 
      Firstname, 
      Gender, 
      Birthday, 
      City, 
      Country, 
      Address, 
      Phone, 
      CIC, 
      CreatedAt, 
      UpdatedAt
    )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    customerParams,
  );
  return result.insertId;
};

export const updateById = async (id, customerParams) => {
  const pool = await initializeDatabase();
  const params = [...customerParams, id];
  const [result] = await pool.execute(
    `UPDATE ${customerTable} SET AccountId = ?, 
      Lastname = ?, 
      Firstname = ?, 
      Gender = ?, 
      Birthday = ?,
      City = ?, 
      Country = ?, 
      Address = ?, 
      Phone = ?, 
      CIC = ?, 
      CreatedAt = ?, 
      UpdatedAt = ? 
    WHERE CustomerId = ?`,
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
