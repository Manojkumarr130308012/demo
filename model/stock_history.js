module.exports = (sequelize,Sequelize) => {
    const stockHistory = sequelize.define('stock_history', {
        employeeId:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        assetId: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        reason: {
            type: Sequelize.ENUM('Available', 'Issued', 'Return' , 'Obsolete'),
            allowNull: true
        },
        action: {
            type: Sequelize.ENUM('Available', 'Issued', 'Return' , 'Obsolete'),
            allowNull: false,
            defaultValue: 'Available'
        }
    });
    return stockHistory;
};

