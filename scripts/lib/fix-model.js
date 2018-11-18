const fs = require('fs');
const helper = require('./helper');

function fix(model, normalizedPath) {
    let fileContents = fs.readFileSync(normalizedPath + `/${model}.js`).toString().split("\n");
    const modelCapitalized = helper.capitalizeFirstLetter(model);

    // search for the return method
    let returnLineNumber = 0;
    let end = 0;
    fileContents.map((value, index) => {
        if (value.search('return sequelize') !== -1) {
            returnLineNumber = index;
        }

        if (value.search('};') !== -1) {
            end = index;
        }
    });

    fileContents[returnLineNumber] = fileContents[returnLineNumber].replace('return', `const ${modelCapitalized} =`);
    fileContents.splice((end), 0, `return ${modelCapitalized};`);
    let text = fileContents.join("\n");

    fs.writeFile(`${normalizedPath}/${model}.js`, text, (err) => {
        if (err) {
            return console.log(`Controller ${model} exist or someting went wrong`);
        }
    });
}

module.exports = {
    one(model, normalizedPath) {
        fix(model, normalizedPath);
    },
    all(normalizedPath) {
        fs.readdirSync(normalizedPath).forEach(model => {
            if (model !== "index.js") {
                // remove the .js
                model = model.slice(0, -3);
                fix(model, normalizedPath);
            }
        });
    }
}
