const path = require("path");
const fs = require('fs');

module.exports = {
    execute() {
        const normalizedPath = path.join(__dirname, "./../../server/models");
        fs.readdirSync(normalizedPath).forEach(model => {
            // exclude index
            if (model !== "index.js") {
                // remove the .js from the string
                model = model.slice(0, -3);

                // create template
                let importStatements = `const ${model} = require("../models").${model};\n`;
                let openModuleExports = `module.exports = {`;
                let closingModuleExports = `};\n`;

                const Model = eval(`require('./../../server/models').${model}`);

                let findByKey = "";
                let allColumns = "";
                for (let key in Model.rawAttributes) {
                    allColumns += `${key}: req.body.${key},\n`;

                    if (Model.rawAttributes[key].primaryKey) {
                        findByKey += `${key}: req.body.${key},\n`
                    }
                }

                let createMethod = `create(req, res) {
            return ${model}
                .create({
                    ${allColumns}
                })
                .then(user => res.status(201).send(user))
                .catch(e => res.status(400).send(e));
            },`;

                let listAllMethod = `listAll(req, res){
            return ${model}
                .findAll()
                .then(records => res.status(201).send(records))
                .catch(e => res.status(400).send(e));
        },`;

                let listOneMethod = `listOne(req, res){
            return ${model}
                .findAll({
                    where: {
                        ${findByKey.replace(/body/g, "params")}
                    }
                })
                .then(record => res.status(201).send(record))
                .catch(e => res.status(400).send(e));
        },`;

                let updateMethod = `update(req, res) {
            return ${model}
                .update(
                    {
                        ${allColumns}
                    },
                    {
                        where: {
                            ${findByKey}
                        }
                    }
                )
                .then(result => res.status(201).send(result))
                .catch(e => res.status(400).send(e));
        },`;

                let deleteMethod = `destroy(req, res) {
            return ${model}
                .destroy(
                    {
                        where: {
                            ${findByKey}
                        }
                    }
                )
                .then(result => res.status(201).send(result))
                .catch(e => res.status(400).send(e));
        },`;

                // join all the methods
                let joiningStrings = `
        ${importStatements}
        ${openModuleExports}
        ${createMethod}
        ${listAllMethod}
        ${listOneMethod}
        ${updateMethod}
        ${deleteMethod}
        ${closingModuleExports}`;

                const controllersPath = path.join(__dirname, "./../../server/controllers");
                fs.writeFile(`${controllersPath}/${model}.js`, joiningStrings, { flag: 'wx' }, (err) => {
                    if (err) {
                        return console.log(`Controller ${model} exist or someting went wrong`);
                    }
                });
            }
        });
        // edit the index.js to export the methods of the controllers
        const controllersPath = path.join(__dirname, "./../../server/controllers");
        let controllerList = "";
        let controllerExports = "";
        fs.readdirSync(normalizedPath).forEach(model => {
            if (model !== "index.js") {
                // remove .js
                model = model.slice(0, -3);
                controllerList += `const ${model} = require('./${model}');\n`;
                controllerExports += `${model},\n`;
            }
        });

        fs.writeFile(`${controllersPath}/index.js`, `
            ${controllerList}
            module.exports = {
                ${controllerExports}
            }
        `, (err) => {
                if (err) {
                    return console.log(err);
                }
            });
    }
}
