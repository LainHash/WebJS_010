import { initializeDatabase } from "../../config/db.js";

const categoryTable = "Categories";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(`SELECT * FROM \`${categoryTable}\``);
    return rows;
  } catch (error) {
    console.error("SQL Error in findAll:", error.message || error);
    throw error;
  }
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT * FROM ${categoryTable} WHERE CategoryId = ?`,
    [id],
  );
  return rows[0] || null;
};

// helper for resolving a category by its name
export const findByName = async (name) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT * FROM ${categoryTable} WHERE CategoryName = ?`,
    [name],
  );
  return rows[0] || null;
};

export const create = async (categoryParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${categoryTable} (CategoryName, Description, CreatedAt, UpdatedAt)
     VALUES (?, ?, ?, ?)`,
    categoryParams,
  );
  return result.insertId;
};

export const updateById = async (id, categoryParams) => {
  const pool = await initializeDatabase();
  const params = [...categoryParams, id];
  const [result] = await pool.execute(
    `UPDATE ${categoryTable} SET CategoryName = ?, Description = ?, CreatedAt = ?, UpdatedAt = ? WHERE CategoryId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${categoryTable} WHERE CategoryId = ?`,
    [id],
  );
  return result.affectedRows;
};
