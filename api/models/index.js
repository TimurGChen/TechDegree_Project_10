const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'fsjstd-restapi.db'
});

const db = {
    Sequelize,
    sequelize,
    models: {},
};

db.models.User = require('./user')(sequelize);
db.models.Course = require('./course')(sequelize);

db.models.User.hasMany(db.models.Course, {as: 'owner', foreignKey: 'userId'});
db.models.Course.belongsTo(db.models.User, {as: 'owner', foreignKey: 'UserId'});

module.exports = db;