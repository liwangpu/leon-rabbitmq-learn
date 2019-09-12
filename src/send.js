const amqp = require("amqplib/callback_api");

amqp.connect("amqp://leon:root@192.168.99.100", function (err, connection) {
    if (err) throw err;

    connection.createChannel(function (err, channel) {
        if (err) throw err;

        let exchange = "direct_logs";
        let msg = 'Hello publish/subscribe';
        // let severity = "info";//can be : info/warning/error
        channel.assertExchange(exchange, "direct", { durable: false });

        channel.publish(exchange, 'info', Buffer.from("info 1"));
        channel.publish(exchange, 'warning', Buffer.from("warning 1"));
        channel.publish(exchange, 'warning', Buffer.from("warning 2"));
        channel.publish(exchange, 'error', Buffer.from("error 1"));
        // console.log(" [x] Sent %s: '%s'", severity, msg);


    });//createChannel


});//connect