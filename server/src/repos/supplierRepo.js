import { initializeDatabase } from "../config/db.js";

const suppliers = "Suppliers";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(`SELECT * FROM \`${suppliers}\``);
    return rows;
  } catch (error) {
    console.error("SQL Error in findAll:", error.message || error);
    throw error;
  }
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT * FROM ${suppliers} WHERE SupplierId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const create = async (supplierParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${suppliers} (CompanyName, ContactName, Country, Phone, Fax)
         VALUES (?, ?, ?, ?, ?)`,
    supplierParams,
  );
  return result.insertId;
};

export const updateById = async (id, supplierParams) => {
  const pool = await initializeDatabase();
  const params = [...supplierParams, id];
  const [result] = await pool.execute(
    `UPDATE ${suppliers} SET CompanyName = ?, ContactName = ?, Country = ?, Phone = ?, Fax = ? WHERE SupplierId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${suppliers} WHERE SupplierId = ?`,
    [id],
  );
  return result.affectedRows;
};
