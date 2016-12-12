
module.exports = function(userDao) {
    //var users = db.sublevel('users');
    var userService = {};

    userService.findUsers = function (userFilter) {
        return userDao.findUsers(userFilter);
    }

    return userService;
};