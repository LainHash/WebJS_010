import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("Payments", {
    PaymentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    PaymentCode: {
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

    PaymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    PaymentProvider: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    TransactionId: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    Amount: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
    },

    Currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "VND",
    },

    Status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    PaidAt: {
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
  await queryInterface.dropTable("Payments");
};
