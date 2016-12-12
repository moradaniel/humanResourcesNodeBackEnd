# Human Resources Management

## REST API

users

## Start backend server:

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


Install dependencies
```
$ npm install --save package
```


Install dev dependencies
```
$ npm install --save-dev package
```
## Testing

Run Once Testing
```
$ export NODE_ENV=unit_testing
$mocha -S --ui bdd  --recursive ./tests --reporter spec
```

Continuous Testing
```
$ export NODE_ENV=unit_testing
$ ./node_modules/nodemon/bin/nodemon.js node_modules/mocha/bin/mocha -S --ui bdd  --recursive ./tests --reporter spec
```

## Production


## ChangeLog

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
  - Implement unit and integration test infrastructure
  - Implement logging with development, test, production environment
  - Add Swagger for REST API documentation
  
  
  ## Credits
  
  - Node JWT - http://blog.slatepeak.com/refactoring-a-basic-authenticated-api-with-node-express-and-mongo/