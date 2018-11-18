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

``` git clone https://github.com/pawiromitchel/sequelize-express.git```

``` cd sequelize-express ```

``` npm install ```

Install the sequelize Model generator

[Read more here](https://github.com/sequelize/sequelize-auto)

``` npm install -g sequelize-auto ```

Edit the server/config/config.json file with your database credentials

### Generate the backend

``` npm run generate:backend ```

``` npm run start:dev ```
