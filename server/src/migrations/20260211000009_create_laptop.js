import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("Laptops", {
    LaptopId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    LaptopCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    LaptopName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    LaptopType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Inches: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    ScreenResolution: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    CpuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "CPUs",
        key: "CpuId",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    GpuId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "GPUs",
        key: "GpuId",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    Memory: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    OpSys: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Weight: {
      type: DataTypes.DECIMAL(5, 2),
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
      defaultValue: 0,
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
  await queryInterface.dropTable("Laptops");
};
