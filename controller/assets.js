const errorHandler = require('../utils/error.handler');
const db = require("../middleware/middleware");
const assetsSchema = db.assets;
const stock_historySchema = db.stockHistory;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require('uuid')


class AssetController {


    async add(body) {
        try {
            let uuid = uuidv4();
            body.serialNumber = uuid;
            let asset = await assetsSchema.create(body);

            let stockhistory = {
                "assetId": asset.id,
                "action": asset.status
            }

            await stock_historySchema.create(stockhistory);

            return {
                status: 'success',
                msg: 'Asset created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Asset creation failed'
            }
        }
    }


    async issueStock(body) {
        try {


            let asset = {
                "status": body.action
            }

            await assetsSchema.update(asset, {
                where: { id: body.assetId }
            });

            let stockhistory = {
                "assetId": body.assetId,
                "employeeId": body.employeeId,
                "action": asset.action
            }

            await stock_historySchema.create(stockhistory);

            return {
                status: 'success',
                msg: 'Asset created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Asset creation failed'
            }
        }
    }


    async returnStock(body) {
        try {


            let asset = {
                "status": body.action
            }

            await assetsSchema.update(asset, {
                where: { id: body.assetId }
            });

            let stockhistory = {
                "assetId": body.assetId,
                "employeeId": body.employeeId,
                "action": body.action
            }

            await stock_historySchema.create(stockhistory);

            return {
                status: 'success',
                msg: 'Asset created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Asset creation failed'
            }
        }
    }


    async ObsoleteStock(body) {
        try {
            let asset = {
                "status": body.action
            }

            await assetsSchema.update(asset, {
                where: { id: body.assetId }
            });

            let stockhistory = {
                "assetId": body.assetId,
                "employeeId": body.employeeId,
                "action": body.action,
                "reason":body.reason
            }

            await stock_historySchema.create(stockhistory);

            return {
                status: 'success',
                msg: 'Asset created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Asset creation failed'
            }
        }
    }





    async fetch(name) {
        try {

            var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            let response = await assetsSchema.findAll({
                include: [{
                    model: db.assetsCategory
                },
                {
                    model: db.branch,
                }],
                where: condition
            });
            let count = Object.keys(response).length;
            return {
                response: response,
                count: count
            };
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }



    async issuedAsset() {
        try {
            let response = await assetsSchema.findAll({
                where: { status: "Issued" }
            });
            return response;
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }


    async returnAsset() {
        try {
            let response = await assetsSchema.findAll({
                where: { status: "Return" }
            });
            return response;
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }

    async obsoleteAsset() {
        try {
            let response = await assetsSchema.findAll({
                where: { status: "Obsolete" }
            });
            return response;
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }



    async fetchdata(id) {
        try {
            let response = await assetsSchema.findByPk(id);
            return response;
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }

    async delete(id) {
        try {
            let response = await assetsSchema.destroy({
                where: { id: id }
            });
            return {
                status: "success",
                response: response
            };
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }

    async update(id, body) {
        try {
            let response = await assetsSchema.update(body, {
                where: { id: id }
            });
            return { status: "success", msg: "Asset Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}

db.assetsCategory.hasMany(assetsSchema, {
    foreignKey: "asset_categoryId",
    targetKey: "id",
});

assetsSchema.belongsTo(db.assetsCategory, {
    foreignKey: "asset_categoryId",
    targetKey: "id",
});


db.branch.hasMany(assetsSchema, {
    foreignKey: "branchId",
    targetKey: "id",
});

assetsSchema.belongsTo(db.branch, {
    foreignKey: "branchId",
    targetKey: "id",
});


module.exports = new AssetController();