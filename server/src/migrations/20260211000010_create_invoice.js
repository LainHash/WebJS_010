import { DataTypes, Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("Invoices", {
    InvoiceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    InvoiceCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Customers",
        key: "CustomerId",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    EmployeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Employees",
        key: "EmployeeId",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    RequiredDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ShippedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    PaymentStatus: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ShipmentStatus: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    DiscountAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      allowNull: true,
    },
    TaxAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      allowNull: true,
    },
    ShippingFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    TotalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    ShippingName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ShippingPhone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    ShippingAddress: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    ShippingCity: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ShippingCountry: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Note: {
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
  await queryInterface.dropTable("Invoices");
};
