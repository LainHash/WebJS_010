import { sequelize, runMigrations } from "./migrations/index.js";

const migrate = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✓ Database connection established");

    // Run migrations
    await runMigrations();

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

migrate();
