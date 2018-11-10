# Sequelize ORM with Express

Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more. ~ Sequelize

Read more on their website http://docs.sequelizejs.com

## Project Structure

- bin
  - www
- server
  - config
  - controllers
  - middlewares
  - models
  - routes
- .sequelizerc
- .app.js

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

