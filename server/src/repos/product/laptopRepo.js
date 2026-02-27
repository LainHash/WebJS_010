import { initializeDatabase } from "../../config/db.js";

const laptopTable = "Laptops";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(
      `SELECT
        LaptopId, 
        LaptopType, 
        Inches, 
        ScreenResolution, 
        CpuId, 
        GpuId, 
        Memory,
        OpSys, 
        Weight, 
        CreatedAt, 
        UpdatedAt 
      FROM \`${laptopTable}\``,
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
    `SELECT 
      LaptopId, 
      LaptopType, 
      Inches, 
      ScreenResolution, 
      CpuId,
      GpuId, 
      Memory, 
      OpSys, 
      Weight, 
      CreatedAt, 
      UpdatedAt 
    FROM ${laptopTable} WHERE LaptopId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const create = async (laptopParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${laptopTable} (
      LaptopType,
      Inches, 
      ScreenResolution, 
      CpuId, 
      GpuId, 
      Memory, 
      OpSys, 
      Weight, 
      CreatedAt, 
      UpdatedAt
    )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    laptopParams,
  );
  return result.insertId;
};

export const updateById = async (id, laptopParams) => {
  const pool = await initializeDatabase();
  const params = [...laptopParams, id];
  const [result] = await pool.execute(
    `UPDATE ${laptopTable} SET 
      LaptopType = ?, 
      Inches = ?, 
      ScreenResolution = ?, 
      CpuId = ?, GpuId = ?, 
      Memory = ?, 
      OpSys = ?, 
      Weight = ?, 
      CreatedAt = ?, 
      UpdatedAt = ? 
    WHERE LaptopId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${laptopTable} WHERE LaptopId = ?`,
    [id],
  );
  return result.affectedRows;
};
