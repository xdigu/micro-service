const routes = require('express').Router();
const userController = require('./controller/user');

routes.post('/users', userController.storage);
routes.get('/users', userController.index);
routes.get('/users/:user_id', userController.show);


module.exports = routes;
