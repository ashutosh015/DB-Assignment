const { Sequelize, DataTypes } = require('sequelize');

// Here we can change the config according to our and database requirements. This is just for assignments purpose
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false,
  define: {
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

/*
Common Config
This will create following coloums in all table  
 - created_at
 - modefied_at
 - deleted_at
*/
const commonConfig = {
  createdAt: true,
  updatedAt: 'modefied_at',
  underscored: true,
  paranoid: true,
};

// Product Category Model
const product_category = sequelize.define(
  'product_category',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
  },
  commonConfig,
);

// Product Inventory Model
const product_inventory = sequelize.define(
  'product_inventory',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  commonConfig,
);

// Discount Model
const discount = sequelize.define(
  'discount',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    discount_percent: DataTypes.DECIMAL,
    active: DataTypes.BOOLEAN,
  },
  commonConfig,
);

// Product Model
const product = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    SKU: DataTypes.STRING,
    price: DataTypes.DECIMAL,
  },
  commonConfig,
);

// Associations
product_category.hasMany(product, {
  foreignKey: 'category_id',
});
product.belongsTo(product_category, {
  foreignKey: 'category_id',
});

product_inventory.hasMany(product, {
  foreignKey: 'inventory_id',
});
product.belongsTo(product_inventory, {
  foreignKey: 'inventory_id',
});

discount.hasMany(product, {
  foreignKey: 'discount_id',
});
product.belongsTo(discount, {
  foreignKey: 'discount_id',
});

module.exports = { product_category, product_inventory, discount, product };
