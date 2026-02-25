import { initializeDatabase } from "../../config/db.js";

const cpuTable = "CPUs";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(
      `SELECT CpuId, Cores, Logicals, Tdp, Socket, Speed, Turbo, CreatedAt, UpdatedAt FROM \`${cpuTable}\``,
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
    `SELECT CpuId, Cores, Logicals, Tdp, Socket, Speed, Turbo, CreatedAt, UpdatedAt FROM ${cpuTable} WHERE CpuId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const create = async (cpuParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${cpuTable} (Cores, Logicals, Tdp, Socket, Speed, Turbo, CreatedAt, UpdatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    cpuParams,
  );
  return result.insertId;
};

export const updateById = async (id, cpuParams) => {
  const pool = await initializeDatabase();
  const params = [...cpuParams, id];
  const [result] = await pool.execute(
    `UPDATE ${cpuTable} SET Cores = ?, Logicals = ?, Tdp = ?, Socket = ?, Speed = ?, Turbo = ?, CreatedAt = ?, UpdatedAt = ? WHERE CpuId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${cpuTable} WHERE CpuId = ?`,
    [id],
  );
  return result.affectedRows;
};
