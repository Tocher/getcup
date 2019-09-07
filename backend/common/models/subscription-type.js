
const app = require('../../server/server');

module.exports = function(Subscriptiontype) {
  Subscriptiontype.getWithSubtypes = async() => {
    const SubscriptionSubtype = app.models.SubscriptionSubtype;

    let types = await Subscriptiontype.find({include: 'subtypes'});
    if (!types) return [];

    // Important!
    // Need to make JSON and parse it back to use data with subtypes
    types = JSON.stringify(types);
    types = JSON.parse(types);

    types.map(type => {
      type.subtypes.map(async(subtype) => {
        if (subtype.price.length > 1) {
          subtype.price = subtype.price.reduce((prev, current) => (prev.date > current.date) ? prev : current);
        } else {
          subtype.price = subtype.price[0];
        }
      });
    });

    return types;
  };
};
