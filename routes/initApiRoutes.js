const nutritionApiRoutes = require("./nutritionApiRoutes.js")

const initApiRoutes = (app) => {
    app.use("/api/v1/nutrition", nutritionApiRoutes)
}

module.exports = initApiRoutes;