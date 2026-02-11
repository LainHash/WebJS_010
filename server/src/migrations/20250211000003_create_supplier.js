import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("Suppliers", {
    SupplierId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    SupplierCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    CompanyName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ContactName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Country: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Fax: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("Suppliers");
};
