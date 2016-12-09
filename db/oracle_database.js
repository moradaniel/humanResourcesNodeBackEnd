//var http = require('http');
var oracledb = require('oracledb');
var dbConfig = require('./../config/dbconfig.js');
//var httpPort = 7000;

var pool = null;

// Main entry point.  Creates a connection pool, on callback creates an
// HTTP server that executes a query based on the URL parameter given.
// The pool values shown are the default values.
function init() {
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
            // Create HTTP server and listen on port - httpPort
            /*http
                .createServer(function(request, response) {
                    handleRequest(request, response, pool);
                })
                .listen(httpPort, "localhost");

            console.log("Server running at http://localhost:" + httpPort);*/
            pool = createdPool;

        })
        .catch(function(err) {
            console.error("createPool() error: " + err.message);
        });
}

/*sql:                    "SELECT employee_id, first_name, last_name " +
"FROM employees " +
"WHERE department_id = :id",*/
//bindParams:

//execute(sql, bindParams, options, connection)

function simpleExecute(sql, bindParams, options) {
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

module.exports.simpleExecute = simpleExecute;

function handleRequest(request, response, pool) {
    var urlparts = request.url.split("/");
    var deptid = urlparts[1];

    htmlHeader(
        response,
        "Oracle Database Driver for Node.js",
        "Example using node-oracledb driver"
    );

    if (deptid != parseInt(deptid)) {
        handleError(
            response,
            'URL path "' + deptid + '" is not an integer.  Try http://localhost:' + httpPort + '/30',
            null
        );

        return;
    }

    // Checkout a connection from the pool
    pool.getConnection()
        .then(function(connection) {
            // console.log("Connections open: " + pool.connectionsOpen);
            // console.log("Connections in use: " + pool.connectionsInUse);

            connection.execute(
                "SELECT employee_id, first_name, last_name " +
                "FROM employees " +
                "WHERE department_id = :id",
                [deptid] // bind variable value
            )
                .then(function(result) {
                    displayResults(response, result, deptid);

                    /* Release the connection back to the connection pool */
                    connection.release()
                        .then(function() {
                            htmlFooter(response);
                        })
                        .catch(function(err) {
                            handleError(response, "normal release() error", err);
                        });
                })
                .catch(function(err) {
                    connection.release()
                        .catch(function(err) {
                            // Just logging because handleError call below will have already
                            // ended the response.
                            console.error("execute() error release() error", err);
                        });
                    handleError(response, "execute() error", err);
                });
        })
        .catch(function(err) {
            handleError(response, "getConnection() error", err);
        });
}

// Report an error
function handleError(response, text, err) {
    if (err) {
        text += err.message;
    }
    console.error(text);
    response.write("<p>Error: " + text + "</p>");
    htmlFooter(response);
}

// Display query results
function displayResults(response, result, deptid) {
    response.write("<h2>" + "Employees in Department " + deptid + "</h2>");
    response.write("<table>");

    // Column Title
    response.write("<tr>");
    for (var col = 0; col < result.metaData.length; col++) {
        response.write("<td>" + result.metaData[col].name + "</td>");
    }
    response.write("</tr>");

    // Rows
    for (var row = 0; row < result.rows.length; row++) {
        response.write("<tr>");
        for (col = 0; col < result.rows[row].length; col++) {
            response.write("<td>" + result.rows[row][col] + "</td>");
        }
        response.write("</tr>");
    }
    response.write("</table>");
}

// Prepare HTML header
/*function htmlHeader(response, title, caption) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
    response.write("<style>" +
        "body {background:#FFFFFF;color:#000000;font-family:Arial,sans-serif;margin:40px;padding:10px;font-size:12px;text-align:center;}" +
        "h1 {margin:0px;margin-bottom:12px;background:#FF0000;text-align:center;color:#FFFFFF;font-size:28px;}" +
        "table {border-collapse: collapse;   margin-left:auto; margin-right:auto;}" +
        "td {padding:8px;border-style:solid}" +
        "</style>\n");
    response.write("<title>" + caption + "</title>");
    response.write("</head>");
    response.write("<body>");
    response.write("<h1>" + title + "</h1>");
}*/

// Prepare HTML footer
/*function htmlFooter(response) {
    response.write("</body>\n</html>");
    response.end();
}*/

process
    .on('SIGTERM', function() {
        console.log("\nTerminating");
        process.exit(0);
    })
    .on('SIGINT', function() {
        console.log("\nTerminating");
        process.exit(0);
    });

init();