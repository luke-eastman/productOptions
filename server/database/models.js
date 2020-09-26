const db = require('./index.js');
const {Sequelize, DataTypes} = require('sequelize');


const Product = db.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reviews: {
   type: DataTypes.INTEGER,
    defaultValue: 0
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})
const Store = db.define('Store', {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true
  }
});

const Stock = db.define('Stock', {
  color: {
    type: DataTypes.STRING
  },
  size: {
    type: DataTypes.STRING
  },
  qty: {
   type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

// have to add this line to avoid checking for foreign keys
// when initializing the database
let promise = db.query("set FOREIGN_KEY_CHECKS=0");

Product.hasMany(Stock);
Store.hasMany(Stock);
Stock.belongsTo(Product);
Stock.belongsTo(Store);

// set FOREIGN_KEY_CHECKS=0;



Product.sync();
Stock.sync();
Store.sync();

const models = {Product, Stock, Store};

module.exports = models;