# Sequelize ORM with Express

Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more. ~ Sequelize

Read more on their website http://docs.sequelizejs.com

This project is using JWT to secure the routes (middlewares are included)

## Technologies used

- Node.js
- Expressjs
- Sequelize
- JWT

## Project Structure

```

- bin
  - www                     //-- default port will be 8000
- scripts
  - generate-controllers.js //-- JS script to generate the controllers
  - generate-routes.js      //-- JS script to generate the routes
- server
  - config                  //-- all your config files need to be defined here
    - config.json           //-- database credentials (dev,test,prod)
    - jwt.json              //-- JWT secret
    - messages.json         //-- Static messages
  - controllers             //-- Define your controllers here
  - middlewares
    - jwt.js                //-- get and verify the JWT token
  - models
    - index.js              //-- auto import your models that are defined within this folder
    - model.js              //-- Just use the existing files ase a boilerplate to modify yours
  - routes
- .sequelizerc              //-- http://docs.sequelizejs.com/manual/tutorial/migrations.html#the-sequelizerc-file
- .app.js                   //-- the Express file

```

## Run the project

``` git clone https://github.com/pawiromitchel/sequelize-express.git```

``` cd sequelize-express ```

``` npm install ```

Edit the server/config/config.json file with your database credentials

``` npm run start:dev ```

## Generating a new Model

I'm using Sequelize-auto to generate a model based on my table, so you'll need to install that first. Just read the install docs within the repository. (https://github.com/sequelize/sequelize-auto)

``` sequelize-auto -o "./server/models" -d <database> -h localhost -u root -p 3306 -x <password> -e mysql -t <tables> ```

If you want to generate all your tables, just remove the '-t' with its parameters and let it run.

## Generating the controllers

The following methods will be added to the controller
1. Create
2. ListAll
3. ListOne
4. Update
5. Destroy (Delete)

``` npm run generate:controllers ```

This will generate the controllers within the ```controllers/``` folder.

## Generating the routes

``` npm run generate:routes ```

This will generate the controllers within the ```routes/``` folder.
The endpoint of that route will be the same as the controller.

This is the generated roles route
```
const jwt = require('../middlewares/jwt');
const rolesController = require('../controllers').roles;

module.exports = (app) => {
  app.route('/roles')
    .get([jwt.getToken, jwt.verifyToken], rolesController.listAll)
    .post([jwt.getToken, jwt.verifyToken], rolesController.create)
    .put([jwt.getToken, jwt.verifyToken], rolesController.update)
    .delete([jwt.getToken, jwt.verifyToken], rolesController.destroy);

  app.get('/roles/:id', [jwt.getToken, jwt.verifyToken], rolesController.listOne);
};
```
