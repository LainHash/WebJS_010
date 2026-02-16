import { initializeDatabase } from "../config/db.js";

const gpuTable = "GPUs";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(`SELECT * FROM \`${gpuTable}\``);
    return rows;
  } catch (error) {
    console.error("SQL Error in findAll:", error.message || error);
    throw error;
  }
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT * FROM ${gpuTable} WHERE GpuId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const create = async (gpuParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${gpuTable} (GpuName, MemorySize, MemoryType, Clock, UnifiedShader, Tmu, Rop, Bus, Chip, CategoryId, SupplierId, UnitPrice, UnitsInStock, Discontinued, CreatedAt, UpdatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    gpuParams,
  );
  return result.insertId;
};

export const updateById = async (id, gpuParams) => {
  const pool = await initializeDatabase();
  const params = [...gpuParams, id];
  const [result] = await pool.execute(
    `UPDATE ${gpuTable} SET GpuName = ?, MemorySize = ?, MemoryType = ?, Clock = ?, UnifiedShader = ?, Tmu = ?, Rop = ?, Bus = ?, Chip = ?, CategoryId = ?, SupplierId = ?, UnitPrice = ?, UnitsInStock = ?, Discontinued = ?, CreatedAt = ?, UpdatedAt = ? WHERE GpuId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${gpuTable} WHERE GpuId = ?`,
    [id],
  );
  return result.affectedRows;
};
