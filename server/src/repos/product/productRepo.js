import { initializeDatabase } from "../../config/db.js";

const productTable = "Products";

// base queries returning only the columns defined on the Products table
export const findAllBase = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(`SELECT * FROM \`${productTable}\``);
    return rows;
  } catch (error) {
    console.error("SQL Error in findAllBase:", error.message || error);
    throw error;
  }
};

export const findByIdBase = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT * FROM ${productTable} WHERE ProductId = ?`,
    [id],
  );
  return rows[0] || null;
};

// specialized queries with joins or other derived columns
export const findAllWithNames = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(
      `SELECT p.*, c.CategoryName AS CategoryName, s.CompanyName AS CompanyName
       FROM \`${productTable}\` p
       LEFT JOIN Categories c ON p.CategoryId = c.CategoryId OR p.CategoryId = c.CategoryId
       LEFT JOIN Suppliers s ON p.SupplierId = s.SupplierId OR p.SupplierId = s.SupplierId`,
    );
    return rows;
  } catch (error) {
    console.error("SQL Error in findAllWithNames:", error.message || error);
    throw error;
  }
};

export const findByIdWithNames = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT p.*, c.CategoryName AS CategoryName, s.CompanyName AS CompanyName
       FROM ${productTable} p
       LEFT JOIN Categories c ON p.CategoryId = c.CategoryId OR p.CategoryId = c.CategoryId
       LEFT JOIN Suppliers s ON p.SupplierId = s.SupplierId OR p.SupplierId = s.SupplierId
       WHERE p.ProductId = ?`,
    [id],
  );
  return rows[0] || null;
};

// keep original exports for backwards compatibility
export const findAll = findAllWithNames;
export const findById = findByIdWithNames;

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
