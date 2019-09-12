const amqp = require("amqplib/callback_api");

amqp.connect("amqp://leon:root@192.168.99.100", function (err, connection) {
    if (err) throw err;

    connection.createChannel(function (err, channel) {
        if (err) throw err;

        let exchange = "my_logs";

        channel.assertExchange(exchange, "fanout", { durable: false });

        channel.assertQueue("", { exclusive: true }, function (err, q) {
            if (err) throw err;

            channel.bindQueue(q.queue, exchange, '');

            channel.consume(q.queue, function (msg) {

                if (msg.content)
                    console.log(" [x] %s", msg.content.toString());

            }, { noAck: true });//consume


        });//assertQueue


        // console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        // channel.consume(queue, function (msg) {
        //     console.log(" [x] Received %s", msg.content.toString());

        //     setTimeout(() => {
        //         console.log(" [x] Done");
        //         channel.ack(msg);
        //     }, 5000);

        // }, { noAck: false });

    });//createChannel


});//connect