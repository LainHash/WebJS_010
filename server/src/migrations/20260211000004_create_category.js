import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("Categories", {
    CategoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CategoryCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    CategoryName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
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
  await queryInterface.dropTable("Categories");
};
