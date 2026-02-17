import { initializeDatabase } from "../config/db.js";

const productTable = "Products";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(`SELECT * FROM \`${productTable}\``);
    return rows;
  } catch (error) {
    console.error("SQL Error in findAll:", error.message || error);
    throw error;
  }
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT * FROM ${productTable} WHERE ProductId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const create = async (productParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${productTable} (
        ProductId,
        ProductCode, 
        ProductName, 
        CategoryId, 
        SupplierId, 
        UnitPrice, 
        UnitsInStock,
        CreatedAt, 
        UpdatedAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    productParams,
  );
  return result.insertId;
};

export const updateById = async (id, productParams) => {
  const pool = await initializeDatabase();
  const params = [...productParams, id];
  const [result] = await pool.execute(
    `UPDATE ${productTable} SET
        ProductCode = ?, 
        ProductName = ?,
        CategoryId = ?,
        SupplierId = ?,
        UnitPrice = ?,
        UnitsInStock = ?,
        CreatedAt = ?,
        UpdatedAt = ?
        WHERE ProductId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${productTable} WHERE ProductId = ?`,
    [id],
  );
  return result.affectedRows;
};
