const express = require('express');
const app = express();

const config=require('./config/config.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./middleware/middleware.js");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


  const employeeRouter = require('./router/employee.js');
  const assetCategoryRouter = require('./router/asset_category.js');
  const assetRouter = require('./router/assets.js');
  const branchRouter = require('./router/branch.js');

  app.use("/employee", employeeRouter);
  app.use("/assetsCategory", assetCategoryRouter);
  app.use("/asset", assetRouter);
  app.use("/branch", branchRouter);

app.listen(config.PORT, () => console.log(`url-shortener listening on port ${config.PORT}!`));