import { initializeDatabase } from "../../config/db.js";

const userTable = "Accounts";

export const generateAccountCode = async () => {
  const pool = await initializeDatabase();
  const year2 = new Date().getFullYear().toString().slice(-2);
  const prefix = `U${year2}`;

  const [rows] = await pool.execute(
    `SELECT AccountCode FROM ${userTable} WHERE AccountCode LIKE ? ORDER BY AccountId DESC LIMIT 1`,
    [`${prefix}%`],
  );

  let nextSeq = 1;
  if (rows.length) {
    const lastCode = rows[0].AccountCode;
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
    const [rows] = await pool.execute(
      `SELECT AccountId, AccountCode, Username, Email, PasswordHash, RoleId, IsActive, CreatedAt, UpdatedAt FROM \`${userTable}\``,
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
    `SELECT AccountId, AccountCode, Username, Email, PasswordHash, RoleId, IsActive, CreatedAt, UpdatedAt FROM ${userTable} WHERE AccountId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const findByEmail = async (email) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT AccountId, AccountCode, Username, Email, PasswordHash, RoleId, IsActive, CreatedAt, UpdatedAt FROM ${userTable} WHERE Email = ?`,
    [email],
  );
  return rows[0] || null;
};

export const create = async (userParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${userTable} (AccountCode, Username, Email, PasswordHash, RoleId, IsActive, CreatedAt, UpdatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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
