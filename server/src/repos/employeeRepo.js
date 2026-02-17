import { initializeDatabase } from "../config/db.js";

const employeeTable = "Employees";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(`SELECT * FROM \`${employeeTable}\``);
    return rows;
  } catch (error) {
    console.error("SQL Error in findAll:", error.message || error);
    throw error;
  }
};

export const findById = async (id) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT * FROM ${employeeTable} WHERE EmployeeId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const create = async (employeeParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${employeeTable} (
      EmployeeCode, 
      AccountId, 
      Lastname, 
      Firstname, 
      Gender, 
      Birthday, 
      Phone, 
      CIC,
      Address, 
      BusinessEmail, 
      Department, 
      Position, 
      HiredDate, 
      Salary, 
      ManagerId, 
      Status, 
      CreatedAt, 
      UpdatedAt
    )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    employeeParams,
  );
  return result.insertId;
};

export const updateById = async (id, employeeParams) => {
  const pool = await initializeDatabase();
  const params = [...employeeParams, id];
  const [result] = await pool.execute(
    `UPDATE ${employeeTable} SET 
      EmployeeCode = ?, 
      AccountId = ?, 
      Lastname = ?, 
      Firstname = ?, 
      Gender = ?, 
      Birthday = ?, 
      Phone = ?, 
      CIC = ?, 
      Address = ?, 
      BusinessEmail = ?, 
      Department = ?, 
      Position = ?, 
      HiredDate = ?, 
      Salary = ?, 
      ManagerId = ?, 
      Status = ?, 
      CreatedAt = ?, 
      UpdatedAt = ? 
    WHERE EmployeeId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${employeeTable} WHERE EmployeeId = ?`,
    [id],
  );
  return result.affectedRows;
};
