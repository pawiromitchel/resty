const execSync = require('child_process').execSync;
const path = require("path");

const fixModel = require('./lib/fix-model');
const generateAssociations = require('./lib/generate-associations');
const generateControllers = require('./lib/generate-controllers');
const generateRoutes = require('./lib/generate-routes');

const databaseConfig = require('./../server/config/config.json').development;
const normalizedPathModels = path.join(__dirname, "./../server/models");

let tables;
// check if --tables
process.argv.forEach(function (val) {
    if (val.search('tables') !== -1) {
        tables = val.split('=')[1];
    }
});

if (!tables) console.log(`[i] No specific tables are specified, so I'll generate all tables (including views)`);

// Step 1: Generate the modal
execSync(`sequelize-auto -o "./server/models" -d ${databaseConfig.database} -h localhost -u root -p ${databaseConfig.password ? databaseConfig.password : ''} 3306 -e mysql ${tables ? '-t ' + tables : ''}`);

setTimeout(() => {
    // Step 2: Fix the model
    console.log('[i] Fix the layout of the model');
    if (tables) {
        tables.split(',').map(value => {
            console.log(`[i] Fixing model ${value}`);
            fixModel.one(value, normalizedPathModels);
        });
    } else {
        console.log(`[i] Fixing all models`);
        fixModel.all(normalizedPathModels);
    }
}, 5000);

setTimeout(() => {
    // Step 3: Generate Associations (In progress)
    console.log('[i] Generating associations');
    generateAssociations.execute();
}, 10000);

setTimeout(() => {
    // Step 4: Generate Controllers
    console.log('[i] Generating controllers');
    generateControllers.execute();
}, 15000);

setTimeout(() => {
    // Step 5: Generate Routes
    console.log('[i] Generating routes');
    generateRoutes.execute();
}, 20000);
