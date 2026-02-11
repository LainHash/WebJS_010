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
    import("./20250211000001_create_role.js"),
    import("./20250211000002_create_user.js"),
    import("./20250211000003_create_supplier.js"),
    import("./20250211000004_create_category.js"),
    import("./20250211000005_create_cpu.js"),
    import("./20250211000006_create_gpu.js"),
    import("./20250211000007_create_customer.js"),
    import("./20250211000008_create_employee.js"),
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
