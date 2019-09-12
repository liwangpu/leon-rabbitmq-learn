const amqp = require("amqplib/callback_api");

amqp.connect("amqp://leon:root@192.168.99.100", function (err, connection) {
    if (err) throw err;

    connection.createChannel(function (err, channel) {
        if (err) throw err;

        var queue = 'task_queue';
        var msg = 'Hello task queue';

        channel.assertQueue(queue, {
            durable: true
        });

        channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
        console.log(" [x] Sent %s", msg);

    });//createChannel


});//connect