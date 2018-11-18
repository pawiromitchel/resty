const path = require("path");
const fs = require('fs');
const helper = require('./helper');

module.exports = {
    execute() {
        const normalizedPath = path.join(__dirname, "./../server/models");
        fs.readdirSync(normalizedPath).forEach(model => {
            if (model !== "index.js") {
                console.log(`=== Doing model: ${model} ===`);
                // remove the .js
                model = model.slice(0, -3);
                const Model = eval(`require('./../server/models').${model}`);
                for (let key in Model.rawAttributes) {
                    // check if there's a foreign_key
                    const reference = Model.rawAttributes[key].references;
                    if (Model.rawAttributes[key].references) {
                        const referenceModel = reference.model;
                        const referenceKey = reference.key;
                        console.log(`${model} has a reference with ${reference.model} via ${reference.key}`);

                        let fileContents = fs.readFileSync(normalizedPath + `/${model}.js`).toString().split("\n");

                        // search for the return method
                        let returnLineNumber = 0;
                        fileContents.map((value, index) => {
                            if (value.search('return') !== -1) {
                                returnLineNumber = index;
                                return
                            }
                        });

                        let association = `
                    ${helper.capitalizeFirstLetter(model)}.associate = function (models) {
                        // associations can be defined here
                        ${helper.capitalizeFirstLetter(model)}.belongsTo(models.${referenceModel}, {
                            foreignKey: '${referenceKey}'
                        });
                    };
                `;

                        const tmp = association.toString().split("\n");
                        tmp.map((value, index) => {
                            fileContents.splice((returnLineNumber + index), 0, value);
                        });

                        console.log(fileContents);
                        let text = fileContents.join("\n");
                    }
                }
                console.log(`=== Ending model: ${model} ===`);
            }
        });
    }
}
