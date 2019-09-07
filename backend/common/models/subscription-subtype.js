
const ObjectId = require('mongodb').ObjectID;

module.exports = function(Subscriptionsubtype) {
  Subscriptionsubtype.defineProperty('subscriptionTypeId', { type: ObjectId } );

  Subscriptionsubtype.updatePrice = async(id, req) => {
    const data = req.body;

    // check if exist
    const subtype = await Subscriptionsubtype.findById(id);
    if (!subtype) throw new Error('No subscription subtype found with provided id');

    // TODO: validate available currencies

    subtype.price.push({
      value: data.value,
      currency: data.currency || subtype.price[subtype.price.length - 1].currency,
      date: new Date()
    });

    await Subscriptionsubtype.upsert(subtype);

    return subtype;
  };
};
