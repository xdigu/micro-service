
module.exports = {
    dialect: 'sqlite',
    storage: 'database/database.sqlite',
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
