const Sequelize = require("sequelize");
const sequelize = new Sequelize('new-posts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}