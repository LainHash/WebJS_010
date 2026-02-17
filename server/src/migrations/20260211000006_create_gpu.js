import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("GPUs", {
    GpuId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Products",
        key: "ProductId",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
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
    Igpu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
