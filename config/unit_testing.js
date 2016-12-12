'use strict';

module.exports = {

    dbConfig: {
        user: "HR",

        // Instead of hard coding the password, consider prompting for it,
        // passing it in an environment variable via process.env, or using
        // External Authentication.
        password: "YOUR_PASSWORD",

        // For information on connection strings see:
        // https://github.com/oracle/node-oracledb/blob/master/doc/api.md#connectionstrings
        connectString: "localhost/XE",

        // Setting externalAuth is optional.  It defaults to false.  See:
        // https://github.com/oracle/node-oracledb/blob/master/doc/api.md#extauth
        externalAuth: false
    },

    server:{
        'port': 3000
    },

    JWT: {
        key: "super_secret_key"

    },

    logging: {
// control flags
        logLevel: 'debug'
    }

};