const path = require("path");
const fs = require('fs');

const normalizedPath = path.join(__dirname, "../server/models");
fs.readdirSync(normalizedPath).forEach(model => {
    // exclude index
    if (model !== "index.js") {
        // remove the .js from the string
        model = model.slice(0, -3);

        // create template
        let importStatements = `const ${model} = require("../models").${model};\n\n`;
        let openModuleExports = `module.exports = {\n`;
        let closingModuleExports = `};\n`;

        const User = require("../server/models").user;

        let findByKey = "";
        let allColumns = "";
        for (let key in User.rawAttributes) {
            allColumns += `${key}: req.params.${key},\n`;

            if (User.rawAttributes[key].primaryKey) {
                findByKey += `${key}: req.params.${key},\n`
            }
        }

        let createMethod = `create(req, res) {
            return User
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
                        ${findByKey}
                    }
                })
                .then(record => res.status(201).send(record))
                .catch(e => res.status(400).send(e));
        },`;

        let updateMethod = `update(req, res) {
            return User
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
            return User
                .update(
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

        fs.writeFile(`../server/controllers/${model}.js`, joiningStrings, { flag: 'wx' }, (err) => {
            if (err) {
                return console.log(`File ${model} exists`);
            }

            console.log(`The controller of ${model} is created`);
        });
    }
});
