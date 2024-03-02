const path = require("path");
const dotenv = require("dotenv");

process.env.NODE_ENV === "production" ? dotenv.config({ path: path.join(__dirname, "./config/prod.env") }) : dotenv.config({ path: path.join(__dirname, "./config/dev.env") });

const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authenticate = require("./src/middlewares/authenticate");
// -------------------------------------------------------------------

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: true, limit: "64kb" }));

app.use(cookieParser());
app.use(express.static("public"));
app.use(cors());
const checkRole = require("./src/middlewares/checkRole.middleware");
const { prisma, produceToQueue } = require("./src/utils");

app.get("/", async (req, res, next) => {
	res.send({ message: "Awesome it works 🐻" });
});

// ====================================================
app.use("/api/v1/auth", require("./src/routes/auth.route"));
app.use("/api/v1/user", require("./src/routes/user.route"));
app.use(authenticate);
// ====================================================
app.use("/api/v1/admin", checkRole(["ADMIN"]), require("./src/routes/admin.route"));
app.use("/api/v1/fund", require("./src/routes/fund.route"));
app.use("/api/v1/charity", require("./src/routes/charity.route"));

// const multer = require("multer");

// =====================================================
app.post("/api/v1/intrested", async (req, res) => {
	const user = req.user;
	const { panNumber } = req.body;
	const dataToSave = {
		userIdRef: user.id,
	};
	const companyPerson = await prisma.Company.findUnique({
		where: { panNumber },
	});

	const intrestedUser = await prisma.Intrested.create({
		data: { dataToSave },
	});

	const data = { companyPerson, intrestedUser };
	const finalReply = { success: "Success", message: "Mail is sent", data: data };

	const messageForQueue = { subject: "User Intrested", text: `Hey I am intrested. please contact me. ${intrestedUser.contactNumber}`, mailTo: user.email };
	await produceToQueue("email_queue", JSON.stringify(messageForQueue));

	return res.status(200).json(finalReply);
});

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

// -------------------------------------------------------------------

const PORT = process.env.PORT || 3969;
const HOST = process.env.HOST || "http://localhost";

console.log("===============================================================");
console.log(`|| --- NODE_ENV: ${process.env.NODE_ENV} --- ||`);
console.log("===============================================================");

app.listen(PORT, HOST, () => console.log(`||🟢 --- @ ${HOST}:${PORT} --- 🚀`));
