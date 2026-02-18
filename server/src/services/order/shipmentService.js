import * as shipmentRepo from "../../repos/order/shipmentRepo.js";
import Shipment from "../../models/order/Shipment.js";

export const getAll = async () => {
  const rows = await shipmentRepo.findAll();
  return rows.map((r) => Shipment.fromDb(r));
};

export const getById = async (id) => {
  const row = await shipmentRepo.findById(id);
  return Shipment.fromDb(row);
};

export const getByInvoiceId = async (invoiceId) => {
  const rows = await shipmentRepo.findByInvoiceId(invoiceId);
  return rows.map((r) => Shipment.fromDb(r));
};

export const createShipment = async (data) => {
  const shipment = new Shipment(data);
  const insertId = await shipmentRepo.create([
    data.invoiceId || shipment.InvoiceId,
    data.shippingProvider || shipment.ShippingProvider,
    data.trackingNumber || shipment.TrackingNumber,
    data.shippingMethod || shipment.ShippingMethod,
    data.shippingFee || shipment.ShippingFee,
    data.status || shipment.Status,
    data.shippedAt || shipment.ShippedAt || null,
    data.deliveredAt || shipment.DeliveredAt || null,
    new Date(),
    new Date(),
  ]);
  shipment.Id = insertId;
  return shipment;
};

export const updateShipment = async (id, data) => {
  const existing = await getById(id);
  if (!existing) return null;
  const updated = new Shipment({ ...existing, ...data, Id: id });
  const affected = await shipmentRepo.updateById(id, [
    data.invoiceId ?? existing.InvoiceId,
    data.shippingProvider ?? existing.ShippingProvider,
    data.trackingNumber ?? existing.TrackingNumber,
    data.shippingMethod ?? existing.ShippingMethod,
    data.shippingFee ?? existing.ShippingFee,
    data.status ?? existing.Status,
    data.shippedAt ?? existing.ShippedAt,
    data.deliveredAt ?? existing.DeliveredAt,
    existing.CreatedAt,
    new Date(),
  ]);
  return affected > 0 ? await getById(id) : null;
};

export const deleteShipment = async (id) => {
  const affected = await shipmentRepo.removeById(id);
  return affected > 0;
};
