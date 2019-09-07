// 'use strict';
//
// module.exports = async (app) => {
//   const User = app.models.user;
//   const Role = app.models.Role;
//   const RoleMapping = app.models.RoleMapping;
//
//   console.log('/// Creating new admin user with custom role ///');
//
//   const email = 'admin@getcoffee.by';
//   const password = 'DVgsll@]W3lOVpm';
//
//   // create user
//   const devUser = await User.create({
//     email,
//     password
//   });
//
//   // create role (developer)
//   const role = await Role.create({
//     name: 'admin'
//   });
//
//   console.log('Role: ', role);
//
//   // create principal
//   const principal = await role.principals.create({
//     principalType: RoleMapping.USER,
//     principalId: devUser.id
//   });
//
//   console.log('Principal: ', principal);
//
//   // authenticate dev user (maximum one year)
//   const ONE_YEAR = 60 * 60 * 24 * 365;
//
//   const accessToken = await User.login({
//     email: email,
//     password: password,
//     ttl: ONE_YEAR
//   });
//
//   console.log('Access Token: ', JSON.stringify(accessToken));
//   console.log('/// Finish creating admin user ///');
// };
