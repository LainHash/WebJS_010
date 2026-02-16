import { initializeDatabase } from "../config/db.js";

const userTable = "Accounts";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(`SELECT * FROM \`${userTable}\``);
    return rows;
  } catch (error) {
    console.error("SQL Error in findAll:", error.message || error);
    throw error;
  }
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT * FROM ${userTable} WHERE AccountId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const create = async (userParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${userTable} (Username, Email, PasswordHash, RoleId, IsActive, CreatedAt, UpdatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    userParams,
  );
  return result.insertId;
};

export const updateById = async (id, userParams) => {
  const pool = await initializeDatabase();
  const params = [...userParams, id];
  const [result] = await pool.execute(
    `UPDATE ${userTable} SET Username = ?, Email = ?, PasswordHash = ?, RoleId = ?, IsActive = ?, CreatedAt = ?, UpdatedAt = ? WHERE AccountId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${userTable} WHERE AccountId = ?`,
    [id],
  );
  return result.affectedRows;
};
