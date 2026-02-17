import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("Products", {
    ProductId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ProductCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    ProductName: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UnitsInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Discontinued: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
  await queryInterface.dropTable("Products");
};
