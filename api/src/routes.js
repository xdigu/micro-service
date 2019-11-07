const routes = require('express').Router();
const userController = require('./controller/user');

routes.post('/users', userController.create);
routes.get('/users', userController.index);
routes.get('/users/:user_id', userController.read);


module.exports = routes;
