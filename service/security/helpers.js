/*const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
const ROLE_OWNER = require('./constants').ROLE_OWNER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;
*/
// Set user info from request
exports.setUserInfo = function setUserInfo(user) {
  const getUserInfo = {
    _id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  };

  return getUserInfo;
};

/*
exports.getRole = function getRole(checkRole) {
  var role;

  switch (checkRole) {
    case ROLE_ADMIN: role = 4; break;
    case ROLE_OWNER: role = 3; break;
    case ROLE_CLIENT: role = 2; break;
    case ROLE_MEMBER: role = 1; break;
    default: role = 1;
  }

  return role;
};
*/