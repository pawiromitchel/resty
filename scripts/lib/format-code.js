const path = require("path");
const fs = require('fs');
const execSync = require('child_process').execSync;

// folders with the files to format
const modelsPath = path.join(__dirname, "./../../server/models");
const controllersPath = path.join(__dirname, "./../../server/controllers");
const routesPath = path.join(__dirname, "./../../server/routes");

const needToFormat = [
    modelsPath, controllersPath, routesPath
];

module.exports = {
    execute() {
        needToFormat.forEach((folder) => {
            fs.readdirSync(folder).forEach(file => {
                execSync(`node_modules/.bin/js-beautify ${folder}/${file} --replace`);
            });
        });
    }
}
