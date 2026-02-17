import { Sequelize } from "sequelize";
import "dotenv/config";

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql", // postgres | mssql | sqlite
  logging: false,
});
export const runMigrations = async () => {
  const queryInterface = sequelize.getQueryInterface();

  // Import all migrations
  const migrations = [
    import("./20260211000001_create_role.js"),
    import("./20260211000002_create_user.js"),
    import("./20260211000003_create_supplier.js"),
    import("./20260211000004_create_category.js"),
    import("./20260211000014_create_product.js"),
    import("./20260211000005_create_cpu.js"),
    import("./20260211000006_create_gpu.js"),
    import("./20260211000007_create_customer.js"),
    import("./20260211000008_create_employee.js"),
    import("./20260211000009_create_laptop.js"),
    import("./20260211000010_create_invoice.js"),
    import("./20260211000011_create_invoice_detail.js"),
    import("./20260211000012_create_payment.js"),
    import("./20260211000013_create_shipment.js"),
  ];

  try {
    for (const migration of await Promise.all(migrations)) {
      console.log(`Running migration...`);
      await migration.up(queryInterface);
    }
    console.log("All migrations completed successfully!");
  } catch (error) {
    console.error("Migration error:", error);
    throw error;
  }
};
