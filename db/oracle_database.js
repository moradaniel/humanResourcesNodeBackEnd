var oracledb = require('oracledb');

var pool = null;

// Main entry point.  Creates a connection pool, on callback creates an
// The pool values shown are the default values.
function init(dbConfig) {
    oracledb.createPool({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString,
        poolMax: 4, // maximum size of the pool
        poolMin: 0, // let the pool shrink completely
        poolIncrement: 1, // only grow the pool by one connection at a time
        poolTimeout: 0  // never terminate idle connections
    })
        .then(function(createdPool) {
            pool = createdPool;

        })
        .catch(function(err) {
            console.error("createPool() error: " + err.message);
        });
}


module.exports = function(dbConfig) {
    init(dbConfig);

    var db = {};

    db.simpleExecute = function (sql, bindParams, options) {
        options.isAutoCommit = true;

        return new Promise(function(resolve, reject) {
            pool.getConnection()
                .then(function (connection) {
                    // console.log("Connections open: " + pool.connectionsOpen);
                    // console.log("Connections in use: " + pool.connectionsInUse);

                    connection.execute(
                        sql,
                        bindParams, // bind variable value
                        options
                        //connection
                    )
                        .then(function (result) {
                            //displayResults(response, result, deptid);
                            resolve(result);
                            /* Release the connection back to the connection pool */
                            connection.release()
                                .then(function () {

                                })
                                .catch(function (err) {
                                    reject(err);
                                    console.error(err);
                                });
                        })
                        .catch(function (err) {
                            reject(err);
                            connection.release()
                                .catch(function (err) {
                                    // Just logging because handleError call below will have already
                                    // ended the response.
                                    console.error("execute() error release() error", err);
                                });
                            console.error("execute() error", err);
                        });
                })
                .catch(function (err) {
                    reject(err);
                    console.error("getConnection() error", err);
                });
        });
    }

    return db;
};


process
    .on('SIGTERM', function() {
        console.log("\nTerminating");
        process.exit(0);
    })
    .on('SIGINT', function() {
        console.log("\nTerminating");
        process.exit(0);
    });
