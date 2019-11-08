const amqp = require('amqplib/callback_api');
const { User } = require('../models');
const queue = 'user';

amqp.connect('amqp://localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {

        ch.assertQueue(queue, { durable: false });
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        ch.consume(queue, async function (msg) {
            const { name, email } = JSON.parse(msg.content);
            await User.create({ name, email });

            console.log(" [x] Received %s", msg.content.toString());
        }, { noAck: true });
    });
});
