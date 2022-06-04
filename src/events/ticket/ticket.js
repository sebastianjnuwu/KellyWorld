const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    dialect: "mysql",
    host: process.env.host,
    port: 3306,
    logging: false,
    define: {
        timestamps: false
    },
});

let ticket = sequelize.define("tickets", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    idc: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = ticket;
module.exports.connect = sequelize;
