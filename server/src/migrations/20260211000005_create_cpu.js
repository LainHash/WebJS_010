import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("CPUs", {
    CpuId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CpuCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    CpuName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Cores: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Logicals: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Tdp: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    Socket: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Speed: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    Turbo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "CategoryId",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    SupplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Suppliers",
        key: "SupplierId",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    UnitPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    UnitsInStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Discontinued: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
  await queryInterface.dropTable("CPUs");
};
