
const ObjectId = require('mongodb').ObjectID;
const app = require('../../server/server');

module.exports = function(Transaction) {
  Transaction.defineProperty('userId', { type: ObjectId } );
  Transaction.defineProperty('subscriptionId', { type: ObjectId } );
  Transaction.defineProperty('placeId', { type: ObjectId } );

  Transaction.createTransaction = async(req) => {
    const Qrcode = app.models.Qrcode;
    const Subscription = app.models.Subscription;

    const data = req.body;

    // Сюда добавить проверку кофейни cafeUserId и cafeUserToken существуют и правильные

    const qrData = await Qrcode.findOne({
      where: {
        hash: data.hash
      }
    });

    if (!qrData) {
      throw new Error('Qrcode not found');
    }

    const subsData = await Subscription.findOne({
      where: {
        userId: qrData.userId
      }
    });

    subsData.cups--;
    qrData.status = 'success';

    await Subscription.upsert(subsData);
    await Qrcode.upsert(qrData);

    return 'success';
  };
};
