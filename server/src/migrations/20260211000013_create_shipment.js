import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("Shipments", {
    ShipmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    ShipmentCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
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

    ShippingProvider: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    TrackingNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    ShippingMethod: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    ShippingFee: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },

    Status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    ShippedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    DeliveredAt: {
      type: DataTypes.DATE,
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
  await queryInterface.dropTable("Shipments");
};
