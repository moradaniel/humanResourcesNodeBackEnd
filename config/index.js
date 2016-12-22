

var config ;

switch (process.env.NODE_ENV) {
    case 'development':
        config = require('./development');
        break;
    case 'unit_testing':
        config = require('./unit_testing');
        break;
    case 'integration_testing':
        config = require('./integration_testing');
        break;
    case 'staging':
        config = require('./staging');
        break;
    case 'production':
        config = require('./production');
        break;
    default:
        console.error("Unrecognized NODE_ENV: " + process.env.NODE_ENV);
        process.exit(1);
}

var diContainer = require('../dependencyInjection/diContainer');


//diContainer.register('dbName', 'example-db');
diContainer.register('tokenSecretKey', config.JWT.key);
diContainer.register('dbConfig', config.dbConfig);

var db;
var userDao;
if(process.env.NODE_ENV=== 'development') {
    db = require('../db/oracle_database');
    userDao = require('../dao/user_dao');
}else
    if(process.env.NODE_ENV=== 'unit_testing'){
        db = require('../tests/dao/test.db');
        userDao = require('../tests/dao/test.user.dao');
    }
//diContainer.factory('authService', require('./lib/authService'));


diContainer.factory('db', db);
diContainer.factory('userDao', userDao);
diContainer.factory('userService', require('../service/user_service'));
diContainer.factory('authenticationController', require('../controller/security/authenticationController'));


config.diContainer = diContainer;

module.exports = config;