const amqp = require("amqplib/callback_api");

amqp.connect("amqp://leon:root@192.168.99.100", function (err, connection) {
    if (err) throw err;

    connection.createChannel(function (err, channel) {
        if (err) throw err;

        let exchange = "direct_logs";
        let severity = "error";//can be : info/warning/error
        channel.assertExchange(exchange, "direct", { durable: false });
        console.log(' [*] Waiting for logs. To exit press CTRL+C');
        channel.assertQueue("", { exclusive: true }, function (err, q) {
            if (err) throw err;

            channel.bindQueue(q.queue, exchange, severity);

            channel.consume(q.queue, function (msg) {

                if (msg.content)
                    console.log(" [x] %s", msg.content.toString());

            }, { noAck: true });//consume


        });//assertQueue

    });//createChannel


});//connect