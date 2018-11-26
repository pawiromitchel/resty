# RESTful Builder

## The starterkit will not be configured with JWT, so you'll have to do it yourself. Look at the master brach to see how it's done.

Sit back and let the builder do the backend work for you

![Core-Concept](https://i.ibb.co/2jWZqkL/RESTful-Builder-Diagrams-Final.png)

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

### Running the app

By default the server will run on port 8000, but it can be specified by the PORT variable

```PORT=<port> npm run start:dev ```

Starting the production server

```PORT=<port> npm run start:prod ```

