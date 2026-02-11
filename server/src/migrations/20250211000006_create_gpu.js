import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("GPUs", {
    GpuId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    GpuCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    GpuName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    MemorySize: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    MemoryType: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Clock: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    UnifiedShader: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Tmu: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Rop: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Bus: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Chip: {
      type: DataTypes.STRING(100),
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
  await queryInterface.dropTable("GPUs");
};
