const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Order = db.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  mealId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'cancelled', 'completed'),
    defaultValue: 'active',
    allowNull: false,
  },
});

module.exports = Order;
