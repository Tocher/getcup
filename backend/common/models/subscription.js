
const ObjectId = require('mongodb').ObjectID;
const config = require('../../config');
const app = require('../../server/server');

module.exports = function(Subscription) {
  Subscription.defineProperty('subscriptionTypeId', { type: ObjectId } );
  Subscription.defineProperty('subscriptionSubtypeId', { type: ObjectId } );
  Subscription.defineProperty('userId', { type: ObjectId } );

  Subscription.createSubscription = async(req) => {
    const SubscriptionSubtype = app.models.SubscriptionSubtype;

    const data = req.body;

    // check if subtype exists
    const subscriptionSubtype = await SubscriptionSubtype.findById(data.subscriptionSubtypeId);
    if (!subscriptionSubtype) {
      const err = new Error('No subscription subtype found with provided id');
      err.status = 400;
      throw err;
    }

    // check if user already has pending or active subscriptions
    const userSubscriptions = await Subscription.find({ userId: data.userId });
    const userPendingSubscriptions = userSubscriptions.filter(s => s.status === config.SUBSCRIPTION_STATUSES.pending);
    if (userPendingSubscriptions && userPendingSubscriptions.length) {
      const err = new Error('User already has pending subscription');
      err.status = 400;
      throw err;
    }
    const userActiveSubscriptions = userSubscriptions.filter(s => s.status === config.SUBSCRIPTION_STATUSES.confirmed);
    if (userActiveSubscriptions && userActiveSubscriptions.length) {
      const err = new Error('User already has active subscription');
      err.status = 400;
      throw err;
    }

    return Subscription.create({
      subscriptionTypeId: data.subscriptionTypeId,
      subscriptionSubtypeId: data.subscriptionSubtypeId,
      userId: data.userId,
      created: new Date(),
      cups: subscriptionSubtype.cups,
      status: config.SUBSCRIPTION_STATUSES.pending,
    });
  };

  // Use only when current status is "pending".
  // Can set "cancelled" or "confirmed"
  Subscription.setStatus = async(id, req) => {
    const data = req.body;

    // check if exist
    const subsData = await Subscription.findById(id);
    if (!subsData) throw new Error('No subscription found with provided id');
    // check if status already "confirmed" to return subscription
    // to avoid cancelling if timeout will occurred
    if (subsData.status === config.SUBSCRIPTION_STATUSES.confirmed) return subsData;

    const now = new Date();
    const waitTime = config.SUBSCRIPTION_WAIT_TIME; // 15 minutes

    // if time passed more than wait time set status to "cancelled"
    if (now - new Date(subsData.created).getTime() > waitTime) {
      subsData.status = config.SUBSCRIPTION_STATUSES.cancelled;
      await Subscription.upsert(subsData);
      throw new Error('Timeout of 15 minutes exceeded');
    }

    // if all check Ok, set confirm status
    subsData.status = data.status;
    return Subscription.upsert(subsData);
  };

  Subscription.getByUser = async(userId) => {
    let subscriptions = await Subscription.find({include: 'owner'});
    // Important!
    // Need to make JSON and parse it back
    subscriptions = JSON.stringify(subscriptions);
    subscriptions = JSON.parse(subscriptions);

    let subscription;

    const subscriptionsByUser = subscriptions.filter(subs => subs.userId === userId);
    // if user has no subscriptions, just returns empty array
    if (subscriptionsByUser.length === 0) {
      return null; // wtf why null?
    }
    // try to find confirmed subscription
    subscription = subscriptionsByUser.filter(subs => subs.status === config.SUBSCRIPTION_STATUSES.confirmed);
    if (subscription && subscription.length > 1) {
      // todo: if more than 1 success subscription we must provide more checks!
      // but for now it just returns first one
      return subscription[0];
    }
    if (subscription && subscription.length === 1) {
      return subscription[0];
    }

    // if no success subscriptions was found, try to find pending
    subscription = subscriptionsByUser.filter(subs => subs.status === config.SUBSCRIPTION_STATUSES.pending);
    // todo: discuss how to handle pending subscriptions
    // for now just returns first pending
    if (subscription.length > 0) {
      return subscription[0];
    }

    // if no confirmed or pending subscriptions was found, return null
    return null;
  };
};
