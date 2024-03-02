const path = require("path");
const dotenv = require("dotenv");

process.env.NODE_ENV === "production" ? dotenv.config({ path: path.join(__dirname, "./config/prod.env") }) : dotenv.config({ path: path.join(__dirname, "./config/dev.env") });

const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const amqp = require("amqplib");

const { sendEmail } = require("./mailService");
const { RABBITMQ_URL, PORT, HOST } = process.env;

const app = express();

app.use(morgan("dev"));

const queueName = "email_queue";

// RabbitMQ consumer
async function consumeQueue() {
	const connection = await amqp.connect(RABBITMQ_URL);
	const channel = await connection.createChannel();

	await channel.assertQueue(queueName, { durable: true });
	console.log(`||🟢 --- @ Worker WAITING FOR MESSAGE --- 🚀`);

	channel.consume(
		queueName,
		async (msg) => {
			const emailContent = JSON.parse(msg.content.toString());

			console.log(`\nEmailContent: ${JSON.stringify(emailContent)}\n`);

			// Send email
			await sendEmail(emailContent);

			// Acknowledge the message
			channel.ack(msg);
		},
		{ noAck: false }
	);
}

// Start consuming the RabbitMQ queue
consumeQueue();

app.use((req, res, next) => {
	next(createError.NotFound());
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send({
		status: err.status || 500,
		message: err.message,
	});
});
console.log("===============================================================");
console.log(`|| --- NODE_ENV: ${process.env.NODE_ENV} --- ||`);
console.log("===============================================================");

app.listen(PORT, "0.0.0.0", () => console.log(`||🟢 --- @ ${HOST}:${PORT} --- 🚀`));
