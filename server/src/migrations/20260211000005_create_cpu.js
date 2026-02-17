import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("CPUs", {
    CpuId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Products",
        key: "ProductId",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
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
