const User = require('./user')
const Mask = require('./mask')
const Order = require('./order')
const Cart = require('./cart')
const OrderDetail = require('./orderDetail')
// const Sequelize = require('sequelize')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// User can have many orders.
// Order will belong to SINGLE User
User.hasMany(Order)
Order.belongsTo(User)

// Details of any given Order are stored in OrderDetail table
// OrderDetail will contain
//      all the different mask Ids in a specific order
//      as well as the quantity ordered and price paid for each Mask type
Order.belongsToMany(Mask, {through: OrderDetail})
Mask.belongsToMany(Order, {through: OrderDetail})

// Cart is the table which will hold order "in the making" for a registered User
// This is for cart persistance for the logged-in users even when session is closed.
Mask.belongsToMany(User, {through: Cart})
User.belongsToMany(Mask, {through: Cart})

// We might have to define various class and/or instance methods for our models as and when required for specific functionality

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Mask,
  Order,
  OrderDetail,
  Cart
}
