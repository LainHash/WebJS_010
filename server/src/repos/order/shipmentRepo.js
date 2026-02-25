import { initializeDatabase } from "../../config/db.js";

const shipments = "Shipments";

export const findAll = async () => {
  try {
    const pool = await initializeDatabase();
    const [rows] = await pool.execute(
      `SELECT ShipmentId, InvoiceId, ShippingProvider, TrackingNumber, ShippingMethod, ShippingFee, Status, ShippedAt, DeliveredAt, CreatedAt, UpdatedAt FROM ${shipments}`,
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
    `SELECT ShipmentId, InvoiceId, ShippingProvider, TrackingNumber, ShippingMethod, ShippingFee, Status, ShippedAt, DeliveredAt, CreatedAt, UpdatedAt FROM ${shipments} WHERE ShipmentId = ?`,
    [id],
  );
  return rows[0] || null;
};

export const findByInvoiceId = async (invoiceId) => {
  const pool = await initializeDatabase();
  const [rows] = await pool.execute(
    `SELECT ShipmentId, InvoiceId, ShippingProvider, TrackingNumber, ShippingMethod, ShippingFee, Status, ShippedAt, DeliveredAt, CreatedAt, UpdatedAt FROM ${shipments} WHERE InvoiceId = ?`,
    [invoiceId],
  );
  return rows;
};

export const create = async (shipmentParams) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `INSERT INTO ${shipments} (InvoiceId, ShippingProvider, TrackingNumber, ShippingMethod, ShippingFee, Status, ShippedAt, DeliveredAt, CreatedAt, UpdatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    shipmentParams,
  );
  return result.insertId;
};

export const updateById = async (id, shipmentParams) => {
  const pool = await initializeDatabase();
  const params = [...shipmentParams, id];
  const [result] = await pool.execute(
    `UPDATE ${shipments} SET InvoiceId = ?, ShippingProvider = ?, TrackingNumber = ?, ShippingMethod = ?, ShippingFee = ?, Status = ?, ShippedAt = ?, DeliveredAt = ?, CreatedAt = ?, UpdatedAt = ? WHERE ShipmentId = ?`,
    params,
  );
  return result.affectedRows;
};

export const removeById = async (id) => {
  const pool = await initializeDatabase();
  const [result] = await pool.execute(
    `DELETE FROM ${shipments} WHERE ShipmentId = ?`,
    [id],
  );
  return result.affectedRows;
};
