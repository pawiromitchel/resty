const path = require("path");
const fs = require('fs');

const normalizedPath = path.join(__dirname, "./../server/controllers");
fs.readdirSync(normalizedPath).forEach(controller => {
    if (controller !== "index.js") {
        // remove the .js
        controller = controller.slice(0, -3);
        let routeContents = `
            const jwt = require('../middlewares/jwt');
            const ${controller}Controller = require('../controllers').${controller};

            module.exports = (app) => {
                app.route('/${controller}')
                  .get(${controller}Controller.listAll)
                  .post(${controller}Controller.create)
                  .put(${controller}Controller.update)
                  .delete(${controller}Controller.destroy);

                app.get('/${controller}/:id',${controller}Controller.listOne);
            };
        `;

        const routesPath = path.join(__dirname, "./../server/routes");
        fs.writeFile(`${routesPath}/${controller}.js`, routeContents, { flag: 'wx' }, (err) => {
            if (err) {
                return console.log(`Route ${controller} exist or someting went wrong`);
            }
        });
    }
});
