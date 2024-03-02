const asyncHandler = require("express-async-handler");
const { prisma } = require("../utils");
const { SUPER_USER_EMAIL } = process.env;
// const fs = require("fs");
// const pdf = require("pdf-parse");
// -------------------------------------------------------------------

// GET /api/v1/fundraise
const getAllFundRaiser = asyncHandler(async (req, res) => {
	const id = req.user.id;

	const item = await prisma.Company.findMany({
		where: {
			userRefId: id,
			verified: true,
		},
	});

	const totalRaisedFund = item.length;
	const data = { totalRaisedFund, item };
	const finalReply = { message: "Success", data: data };

	res.status(200).json(finalReply);
});

// ===============================================
// get my raised and pending funding
// GET /api/v1/get-my-equity
const myAllFund = asyncHandler(async (req, res) => {
	const user = req.user;

	const myEquity = await prisma.Company.findMany({
		where: { userRefId: user.id },
	});

	const totalRaisedFund = myEquity.length;
	const totalPendingFund = myEquity.filter((i) => i.verified === false).length;

	const data = { totalRaisedFund, totalPendingFund, myEquity };
	const finalReply = { message: "Success", data: data };
	res.status(200).json(finalReply);
});

// ===============================================

// POST /api/v1/raise-fund
// first check whether the user is verified or not
// check whether the opened equity is available or not
// apply the proposal

const raiseFund = asyncHandler(async (req, res) => {
	var { name, description, establishment, valuation, panNumber, title, equityPercentage, equityAmount, companyDescription, endDate } = req.body;

	valuation = Number(valuation);
	equityPercentage = Number(equityPercentage);
	equityAmount = Number(equityAmount);

	console.log(`\n\n\n\ --- req.body:: ${JSON.stringify(req.body)} ---\n\n\n\n`);

	if ([name, description, establishment, valuation, panNumber, title, equityPercentage, equityAmount, companyDescription, endDate].some((field) => field?.trim === "")) {
		throw new ApiError(400, "All fields are required");
	}

	const user = req.user;
	const dataToSave = {
		userRefId: user.id,
		name,
		description,
		establishment: new Date(establishment),
		valuation,
		panNumber,
		title,
		equityPercentage,
		equityAmount,
		companyDescription,
		endDate: new Date(endDate),
		logo: "https://res.cloudinary.com/dbqbgk6td/image/upload/v1709358182/logo/leuq9zy2fwzqqagsxy2v.png",
		// document: result.secure_url,
		document: "https://res.cloudinary.com/dbqbgk6td/image/upload/v1709318461/pdf/ypfl8uyjdefqfuak7dno.pdf",
	};

	// fs.unlinkSync(req.file.path);
	const newRaise = await prisma.Company.create({
		data: dataToSave,
	});
	const finalReply = { message: "Success", data: newRaise };

	// await redisClient.set(req.originalUrl, JSON.stringify(finalReply), "EX", REDIS_TTL);

	res.status(200).json(finalReply);
});

// ===================================================
// for normal user, get all raised funding except owns
const item = asyncHandler(async (req, res) => {
	const user = req.user;
	const companies = await prisma.company.findMany({
		where: {
			userRefId: {
				not: user.id,
			},
			verified: true,
		},
	});
	const finalReply = { message: "Success", data: companies };

	res.status(200).json(finalReply);
});
// -------------------------------------------------------------------

// verify the fund raise
module.exports = { myAllFund, getAllFundRaiser, raiseFund, item };
