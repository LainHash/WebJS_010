import { initializeDatabase } from "../../config/db.js";
import tableList from "./tableList.js";

// base queries returning only the columns defined on the Products table
export const findAllBase = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(
      `SELECT * FROM \`${tableList.productTable}\``,
    );
    return rows;
  } catch (error) {
    console.error("SQL Error in findAllBase:", error.message || error);
    throw error;
  }
};

export const findByIdBase = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT * FROM ${tableList.productTable} WHERE ProductId = ?`,
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
       FROM \`${tableList.productTable}\` p
       LEFT JOIN ${tableList.categoryTable} c ON p.CategoryId = c.CategoryId 
       LEFT JOIN ${tableList.supplierTable} s ON p.SupplierId = s.SupplierId`,
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
       FROM ${tableList.productTable} p
       LEFT JOIN ${tableList.categoryTable} c ON p.CategoryId = c.CategoryId 
       LEFT JOIN ${tableList.supplierTable} s ON p.SupplierId = s.SupplierId 
       WHERE p.ProductId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const findByIdWithCpu = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT 
      p.ProductId,
      p.ProductCode,
      p.ProductName,
      p.CategoryId,
      p.SupplierId,
      p.UnitPrice,
      p.UnitsInStock,
      p.Discontinued,
      cpu.Cores,
      cpu.Logicals,
      cpu.Tdp,
      cpu.Socket,
      cpu.Speed,
      cpu.Turbo,
      c.CategoryName,
      s.CompanyName
      FROM ${tableList.productTable} p
      JOIN ${tableList.cpuTable} cpu ON p.ProductId = cpu.CpuId
      LEFT JOIN ${tableList.categoryTable} c ON p.CategoryId = c.CategoryId 
      LEFT JOIN ${tableList.supplierTable} s ON p.SupplierId = s.SupplierId 
      WHERE p.ProductId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const findByIdWithGpu = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT 
      p.ProductId,
      p.ProductCode,
      p.ProductName,
      p.CategoryId,
      p.SupplierId,
      p.UnitPrice,
      p.UnitsInStock,
      p.Discontinued,
      gpu.MemorySize,
      gpu.MemoryType,
      gpu.Clock,
      gpu.UnifiedShader,
      gpu.Tmu,
      gpu.Rop,
      gpu.Bus,
      gpu.Igpu,
      c.CategoryName,
      s.CompanyName
      FROM ${tableList.productTable} p
      JOIN ${tableList.gpuTable} gpu ON p.ProductId = gpu.GpuId
      LEFT JOIN ${tableList.categoryTable} c ON p.CategoryId = c.CategoryId 
      LEFT JOIN ${tableList.supplierTable} s ON p.SupplierId = s.SupplierId 
      WHERE p.ProductId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const findByIdWithLaptop = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT 
      p.ProductId,
      p.ProductCode,
      p.ProductName,
      p.CategoryId,
      p.SupplierId,
      p.UnitPrice,
      p.UnitsInStock,
      p.Discontinued,
      l.LaptopType,
      l.Inches,
      l.ScreenResolution,
      l.CpuId,
      cpu.ProductName AS CpuName,
      l.GpuId,
      gpu.ProductName AS GpuName,
      l.Memory,
      l.OpSys,
      l.Weight,
      c.CategoryName,
      s.CompanyName
      FROM ${tableList.productTable} p
      JOIN ${tableList.laptopTable} l ON p.ProductId = l.LaptopId
      LEFT JOIN ${tableList.categoryTable} c ON p.CategoryId = c.CategoryId 
      LEFT JOIN ${tableList.supplierTable} s ON p.SupplierId = s.SupplierId
      LEFT JOIN ${tableList.productTable} cpu ON l.CpuId = cpu.ProductId
      LEFT JOIN ${tableList.productTable} gpu ON l.GpuId = gpu.ProductId
      WHERE p.ProductId = ?`,
    [id],
  );
  return rows[0] || null;
};

// keep original exports for backwards compatibility
// export const findAll = findAllWithNames;
// export const findById = findByIdWithNames;

export const create = async (productParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${tableList.productTable} (
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
    `UPDATE ${tableList.productTable} SET
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
    `DELETE FROM ${tableList.productTable} WHERE ProductId = ?`,
    [id],
  );
  return result.affectedRows;
};
