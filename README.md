# Human Resources Management

## REST API

**Show User**
----
  Returns json data about a single user.

* **URL**

  /users/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 12, name : "Michael Bloom" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```


## Production

# Start backend server:

```
$ export NODE_ENV=production
$ node server.js
```

## Development

Run server with live reload
```
$ export NODE_ENV=development
$ node ./node_modules/nodemon/bin/nodemon server.js

```


## Testing

Run Once Testing
```
$ export NODE_ENV=unit_testing
$ mocha -S --ui bdd  --recursive ./tests --reporter spec
```

### Continuous Testing
```
$ export NODE_ENV=unit_testing
$ ./node_modules/nodemon/bin/nodemon.js node_modules/mocha/bin/mocha -S --ui bdd  --recursive ./tests --reporter spec
```


### Install dependencies
```
$ npm install --save package
```


### Install dev dependencies
```
$ npm install --save-dev package
```

### Oracle node environment dependencies
```
$ export LD_LIBRARY_PATH=/opt/oracle/instantclient_12_1:$LD_LIBRARY_PATH
$ export OCI_LIB_DIR=/opt/oracle/instantclient_12_1
$ export OCI_INC_DIR=/opt/oracle/instantclient_12_1/sdk/include/

```


## ChangeLog

 - Added authenticationController.register and authenticationController.login with tests
 - Added Passport Authentication
 - Added JWT token generation
 - Added in-memory database for unit testing
 - Added first version of user registration
 - Implemented user password hashing with unit tests
 - Added dependency injection container
 - Added multiple configuration  environments:development,unit_testing,integration_testing,staging,production
 - Added basic unit test infrastructure with Mocha and promise handling
 - Adapted response headers to enable CORS from client-side
 - Added findUsers to DAO
 - Added REST API version 1
 - Using oracledb driver for Oracle data access
 - Using nodemon for live reloading during development
 
 
## TODO
 
  - Add token authentication per request. Use Json Web Tokens (JWT)
  - Add https/SSL protocol
  - Implement register and forgot password features
  - Implement integration test infrastructure
  - Implement logging with development, test, production environment
  - Add Swagger for REST API documentation
  
  
## Credits
  
  - Node JWT - http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/
  - Config - http://eng.datafox.co/nodejs/2014/09/28/nodejs-config-best-practices/
  - Promises - https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
  - Testing https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
  