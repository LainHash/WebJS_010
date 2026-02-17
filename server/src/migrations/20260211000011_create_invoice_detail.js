import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("InvoiceDetails", {
    InvoiceDetailId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    InvoiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Invoices",
        key: "InvoiceId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    ProductType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    ProductName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    UnitPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    DiscountPercent: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
    },

    LineTotal: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
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
  await queryInterface.dropTable("InvoiceDetails");
};
