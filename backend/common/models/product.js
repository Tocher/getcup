
const ObjectId = require('mongodb').ObjectID;

module.exports = function(Product) {
  Product.defineProperty('productTypeId', { type: ObjectId } );
};
