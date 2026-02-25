import { initializeDatabase } from "../../config/db.js";

const roleTable = "Roles";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(
      `SELECT RoleId, RoleName, Description, CreatedAt, UpdatedAt FROM \`${roleTable}\``,
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
    `SELECT RoleId, RoleName, Description, CreatedAt, UpdatedAt FROM ${roleTable} WHERE RoleId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const create = async (roleParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${roleTable} (RoleName, Description, CreatedAt, UpdatedAt)
     VALUES (?, ?, ?, ?)`,
    roleParams,
  );
  return result.insertId;
};

export const updateById = async (id, roleParams) => {
  const pool = await initializeDatabase();
  const params = [...roleParams, id];
  const [result] = await pool.execute(
    `UPDATE ${roleTable} SET RoleName = ?, Description = ?, CreatedAt = ?, UpdatedAt = ? WHERE RoleId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${roleTable} WHERE RoleId = ?`,
    [id],
  );
  return result.affectedRows;
};
