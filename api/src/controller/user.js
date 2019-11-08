const amqp = require('amqplib');
const producer = amqp.connect('amqp://localhost:5672');
const queue = 'user';
const { User } = require('../../../models');

class UserController {
    storage(req, res) {
        const { user } = req.body;

        if (!user.name || !user.email) {
            return res.status(400).json({
                success: false,
                message: 'You must provide user with name and email on body.'
            });
        }

        producer
            .then(conn => conn.createChannel())
            .then(chanel => {
                chanel.assertQueue(queue, { durable: false })
                    .then(_ => {
                        chanel.sendToQueue(queue, Buffer.from(JSON.stringify(user)));
                        console.log(" [x] Sent %s", JSON.stringify(user));

                        return res.json({
                            success: true,
                            message: 'User created'
                        });
                    })
            })
            .catch(console.warn);
    }

    index(req, res) {
        User.findAll()
            .then(users => {
                return res.json({ success: true, data: users });
            })
            .catch(err => {
                return res.status(404).json({
                    success: false,
                    message: err.message || err
                });
            });
    }

    show(req, res) {
        const { user_id } = req.params;

        if (!user_id || isNaN(user_id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user_id.'
            });
        }

        User.findByPk(user_id, {
            attributes: ['id', 'name', 'email'],
        })
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'User not found.',
                    });
                } else {
                    return res.json({
                        success: true,
                        data: user,
                    });
                }
            })
            .catch(err => {
                return res.status(404).json({
                    success: false,
                    message: err.message || err
                });
            });
    }
}


module.exports = new UserController();
