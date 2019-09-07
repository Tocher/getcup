
const generator = require('generate-password');
const ObjectId = require('mongodb').ObjectID;

const app = require('../../server/server');

module.exports = function(user) {

  user.defineProperty('userId', { type: ObjectId } );

  user.beforeSave = function(next) {
    //your logic goes here
    const now = new Date();

    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }

    next();
  };

  user.authSocial = async(req) => {
    const User = app.models.User;
    const data = req.body;

    // generate password
    const password = generator.generate({
      length: 10,
      numbers: true
    });

    // Set TTL time
    const TWO_WEEKS = 60 * 60 * 24 * 7 * 2;

    let accessToken;

    const existingUser = await user.findOne({ where: { email: data.email }});
    if (existingUser) {
      await User.setPassword(existingUser.id, password);
      accessToken = await User.login({
        email: existingUser.email,
        password: password,
        ttl: TWO_WEEKS
      });
    } else {
      const newUser = await user.create({
        email: data.email,
        password: password
      });

      accessToken = await User.login({
        email: newUser.email,
        password: password,
        ttl: TWO_WEEKS
      });
    }

    return accessToken;
  };

  user.createBarista = async(req) => {
    const User = app.models.user;
    const Role = app.models.Role;
    const RoleMapping = app.models.RoleMapping;
    const data = req.body;
    const { email, password, name, placeId } = data;

    if (!(email && password)) {
      throw new Error('Необходимо предоставить email и пароль');
    }

    // create user
    const newBaristaUser = await User.create({
      email,
      password,
      name,
      barista: {
        placeId,
      }
    });

    const role = await Role.create({
      name: 'barista'
    });

    await role.principals.create({
      principalType: RoleMapping.USER,
      principalId: newBaristaUser.id
    });

    return newBaristaUser;
  };

  user.authBarista = (req) => {
    const User = app.models.User;
    const data = req.body;
    const { email, password } = data;

    // Set TTL time
    const TWO_WEEKS = 60 * 60 * 24 * 7 * 2;

    return User.login({
      email,
      password,
      ttl: TWO_WEEKS
    });
  };
};
