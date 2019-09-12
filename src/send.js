const amqp = require("amqplib/callback_api");

amqp.connect("amqp://leon:root@192.168.99.100", function (err, connection) {
    if (err) throw err;

    connection.createChannel(function (err, channel) {
        if (err) throw err;

        let exchange = "my_logs";
        let msg = 'Hello publish/subscribe';

        channel.assertExchange(exchange, "fanout", { durable: false });

        channel.publish(exchange, "", Buffer.from(msg));
        console.log(" [x] Sent %s", msg);

    });//createChannel


});//connect