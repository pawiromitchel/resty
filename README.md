# RESTful Builder

Sit back and let the builder do the backend work for you

## Project Structure

```
- bin
  - www                     //-- default port will be 8000
- scripts
  - lib                     //-- Generators are listed here
  - generate.js             //-- JS script to generate the routes
- server
  - config                  //-- all your config files need to be defined here
    - config.json           //-- database credentials (dev,test,prod)
    - jwt.json              //-- JWT secret
    - messages.json         //-- Static messages
  - controllers             //-- Define your controllers here
  - middlewares             //-- All Express middlewares should be listed here
    - jwt.js                //-- get and verify the JWT token
  - models                  //-- Sequelize Models
    - index.js              //-- auto import your models that are defined within this folder
  - routes                  //-- Express Routes
- .sequelizerc              //-- Sequelize meta config
- .app.js                   //-- the Express file
```

## Init project

``` git clone https://github.com/pawiromitchel/restful-builder.git```

``` cd sequelize-express ```

``` npm install ```

Install the sequelize Model generator

[Read more here](https://github.com/sequelize/sequelize-auto)

``` npm install -g sequelize-auto ```

Edit the server/config/config.json file with your database credentials

### Generate the backend

``` npm run generate:backend ```

By default the server will run on port 8000, but it can be specified by the PORT variable

```PORT=<port> npm run start:dev ```

### Using JWT

Look in thse files
- ```server/controllers/users.js```

The ```auth``` method uses bcrypt to compare the given password with the stored one. Then the token is given as result. That token must be submitted before requesting another route.

- ```app.js```

By default the ```/authenticate``` route is being excluded, because the user submitting the data will not have a token yet. If you want to change the ```pubicRoute``` in the ```server/config/jwt.json``` file to the desired route (for example ```/login```)

### Disable JWT

Normally there is a JWT middleware, but that can be disabled in the app.js.
Remove or comment out the code.

```
// all requests will go through this middleware first
app.use(function (req, res, next) {
  if (req.url === publicRoute) {
    // route normally
    next();
  } else {
    // verify if the requester is authenticated
    jwt.verifyToken(req, res, next);
  }
});
```

Remove the ```server/routes/auth.js``` file, this contains a ```/auth``` route
