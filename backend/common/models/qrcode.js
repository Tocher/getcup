
const app = require('../../server/server');

module.exports = function(Qrcode) {
  Qrcode.getQrcode = async(req) => {
    const User = app.models.user;
    const data = req.body;

    const user = await User.findOne({
      where: {
        // где-то должна быть проверка token
        //token: data.userToken,
        id: data.userId
      }
    });

    if (!user) {
      throw new Error('User not exist or token incorrect');
    }

    // Временный хэш из 7 символов
    const hash = Math.random().toString(36).substring(7);

    const qrcode = await Qrcode.create({
      hash: hash,
      userId: data.userId,
      productId: data.productId,
      created: new Date(),
      status: 'pending'
    });

    return qrcode.hash;
  };

  Qrcode.checkQrcode = async(req) => {
    const User = app.models.user;
    const Subscription = app.models.Subscription;
    const data = req.body;

    const user = await User.findOne({
      where: {
        // где-то должна быть проверка token
        // token: data.userToken,
        id: data.userId
      }
    });

    if (!user) {
      throw new Error('User not exist or token incorrect');
    }

    const qrcode = await Qrcode.findOne({
      where: {
        hash: data.hash
      }
    });

    if (!qrcode || qrcode.userId !== data.userId) {
      throw new Error('Qrcode not found');
    }

    const subsData = await Subscription.findOne({
      where: {
        userId: data.userId
      }
    });

    return {
      status: qrcode.status,
      subscription: subsData //subsData ? null : subsData
    };
  };

  Qrcode.sendQrcode = async(req) => {
    const Subscription = app.models.Subscription;
    const Product = app.models.Product;
    const User = app.models.User;
    const data = req.body;

    // Проверка токена пользователя кофейни

    const qrcode = await Qrcode.findOne({
      where: {
        hash: data.hash
      }
    });

    if (!qrcode) {
      throw new Error('Qrcode not found');
    }

    if (qrcode.status === 'success') {
      return 'error'; // not good approach
    }

    const product = await Product.findById(qrcode.productId);

    if (!product) {
      throw new Error('Product not found');
    }

    const customer = await User.findById(qrcode.userId);

    if (!customer) {
      throw new Error('Customer not found');
    }

    const subsData = await Subscription.findOne({
      where: {
        userId: qrcode.userId,
        status: 'success'
      }
    });

    if (!subsData) {
      throw new Error('Subscription not found');
    }

    subsData.cups--;
    qrcode.status = 'success';

    if (subsData.cups <= 0) {
      await Subscription.destroyById(subsData.id);
    } else {
      await Subscription.upsert(subsData);
    }
    await Qrcode.upsert(qrcode);

    return {
      status: qrcode.status,
      product: product.title,
      customer: {
        name: customer.name,
      },
    };
  };

  Qrcode.removeAll = async() => {
    const qrcode = await Qrcode.destroyAll();
    return 'ok';
  };
};
