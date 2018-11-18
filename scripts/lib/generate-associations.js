const path = require("path");
const fs = require('fs');
const helper = require('./helper');

module.exports = {
    execute() {
        const normalizedPath = path.join(__dirname, "./../../server/models");
        fs.readdirSync(normalizedPath).forEach(model => {
            if (model !== "index.js") {
                console.log(`=== Doing model: ${model} ===`);
                // remove the .js
                model = model.slice(0, -3);
                const Model = eval(`require('./../../server/models').${model}`);
                let modelHasAssociations = false;
                let associationsChild = "";
                let associationParentModel = [];
                for (let key in Model.rawAttributes) {
                    // check if there's a foreign_key
                    const reference = Model.rawAttributes[key].references;
                    if (Model.rawAttributes[key].references) {
                        modelHasAssociations = true;
                        const referenceModel = reference.model;
                        const referenceKey = reference.key;
                        associationParentModel.push(
                            {
                                parent: reference.model,
                                association: `
                        ${helper.capitalizeFirstLetter(referenceModel)}.hasMany(models.${model}, {
                            foreignKey: '${referenceKey}'
                        });
                    `
                            }
                        );
                        console.log(`${model} has a reference with ${reference.model} via ${reference.key}`);

                        associationsChild += `
                    ${helper.capitalizeFirstLetter(model)}.belongsTo(models.${referenceModel}, {
                        foreignKey: '${referenceKey}',
                        as: '${model}_${referenceModel}'
                    });
                `;
                    }
                }

                // editing the child
                if (modelHasAssociations) {
                    let fileContents = fs.readFileSync(normalizedPath + `/${model}.js`).toString().split("\n");

                    // search for the return method
                    let returnLineNumber = 0;
                    fileContents.map((value, index) => {
                        if (value.search('return') !== -1) {
                            returnLineNumber = index;
                            return
                        }
                    });

                    const finalAssociations = `
                        ${helper.capitalizeFirstLetter(model)}.associate = function (models) {
                            ${associationsChild}
                        };
                    `;

                    const tmp = finalAssociations.toString().split("\n");
                    tmp.map((value, index) => {
                        fileContents.splice((returnLineNumber + index), 0, value);
                    });

                    // console.log(fileContents);
                    let text = fileContents.join("\n");
                    const childModelsPath = path.join(__dirname, "./../../server/models");
                    fs.writeFile(`${childModelsPath}/${model}.js`, text, (err) => {
                        if (err) return console.log(err)
                    });

                    // editing the parent
                    Object.values(associationParentModel).forEach(value => {
                        const parent = value.parent;
                        const association = value.association;
                        console.log(`this ${parent} needs to be edited`);

                        // editing the child
                        let fileContents = fs.readFileSync(normalizedPath + `/${parent}.js`).toString().split("\n");

                        // search for the return method
                        let returnLineNumber = 0;
                        fileContents.map((value, index) => {
                            if (value.search('return') !== -1) {
                                returnLineNumber = index;
                                return
                            }
                        });

                        const finalAssociations = `
                            ${helper.capitalizeFirstLetter(parent)}.associate = function (models) {
                                ${association}
                            };
                        `;

                        const tmp = finalAssociations.toString().split("\n");
                        tmp.map((value, index) => {
                            fileContents.splice((returnLineNumber + index), 0, value);
                        });

                        let text = fileContents.join("\n");
                        const parentModelsPath = path.join(__dirname, "./../../server/models");
                        fs.writeFile(`${parentModelsPath}/${parent}.js`, text, (err) => {
                            if (err) return console.log(err)
                        });

                    });
                }
                console.log(`=== Ending model: ${model} ===`);
            }
        });
    }
}
