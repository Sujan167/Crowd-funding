const asyncHandler = require("express-async-handler");
const { generateReferenceCode, redisClient, prisma, customSelect, produceToQueue } = require("../utils");
const { SUPER_USER_EMAIL, REDIS_TTL } = process.env;

// ===================================================================

// PUT /api/admin/verify-new-registration
const verifyNewRegistration = asyncHandler(async (req, res) => {
	const { panNumber } = req.body;
	if (!panNumber) {
		return res.json({ success: false, message: "PAN Number is required" });
	}
	// const referenceKey = await generateReferenceCode(6);

	const company = await prisma.Company.update({
		where: { panNumber },
		data: { verified: true },
	});
	const user = await prisma.User.findUnique({
		where: { id: company.userRefId },
		select: customSelect,
	});
	// console.log(company);
	const data = { company };
	const finalReply = { success: true, message: "New User Verified", data: data };

	const messageForQueue = { subject: "Verification Notice", text: "You have been verified on UpRaise", mailTo: user.email };
	await produceToQueue("email_queue", JSON.stringify(messageForQueue));

	return res.status(200).json(finalReply);
});

// -------------------------------------------------------------------

// PUT /api/admin/suspend-user
const suspendUser = asyncHandler(async (req, res) => {
	const { id } = req.body;
	if (!id) {
		return res.json({ success: false, message: "id is required" });
	}
	const _user = await prisma.User.findUnique({
		where: { id },
	});
	if (_user.email === SUPER_USER_EMAIL) {
		return res.json({ success: false, message: "Super User can't be suspended" });
	}
	const user = await prisma.User.update({
		where: { id },
		data: { suspended: true },
		select: customSelect,
	});
	const messageForQueue = { subject: "Suspended", text: "You are suspended from the system", mailTo: user.email };
	await produceToQueue("email_queue", JSON.stringify(messageForQueue));

	return res.status(200).json({ success: true, message: "User Suspended", data: user });
});

// PUT /api/admin/unsuspend-user
const unSuspendUser = asyncHandler(async (req, res) => {
	const { id } = req.body;
	if (!id) {
		return res.json({ success: false, message: "id is required" });
	}
	const _user = await prisma.User.findFirst({
		where: { id },
	});
	if (_user.suspended === false) {
		return res.json({ success: false, message: "User is not suspended." });
	}
	const user = await prisma.User.update({
		where: { id },
		data: { suspended: false },
		select: customSelect,
	});

	const messageForQueue = { subject: "Suspension Canceled", text: "Welcome! Your suspension from the system is canceled.", mailTo: user.email };
	await produceToQueue("email_queue", JSON.stringify(messageForQueue));

	return res.status(200).json({ success: true, message: "User Suspension canceled", data: user });
});

const getVerificationRequest = asyncHandler(async (req, res) => {
	const companies = await prisma.company.findMany({
		where: { verified: false },
		include: {
			User: {
				select: {
					...customSelect,
				},
			},
		},
	});

	const totalPending = companies.filter((i) => i).length;

	const finalReply = { success: true, message: "New User Verification Request", data: { totalPending, companies } };
	res.status(200).json(finalReply);
});

// -------------------------------------------------------------------

const getAllFundRaiser = asyncHandler(async (req, res) => {
	const id = req.user.id;

	const item = await prisma.proposal.findMany({});

	const totalRaisedFund = item.length;
	const data = { totalRaisedFund, item };
	const finalReply = { message: "Success", data: data };

	// await redisClient.set(req.originalUrl, JSON.stringify(finalReply), "EX", REDIS_TTL);

	res.status(200).json(finalReply);
});

// -------------------------------------------------------------------

const deleteCompany = asyncHandler(async (req, res) => {
	const { panNumber } = req.body;
	console.log(panNumber);
	const company = await prisma.Company.findUnique({
		where: { panNumber },
	});
	if (!company) {
		return res.json({ message: "Company doesnot exist" });
	}
	
	// delete
	await prisma.Company.delete({
		where: { panNumber },
	});

	const finalReply = { message: "Success" };

	res.status(200).json(finalReply);
});
// -------------------------------------------------------------------

module.exports = { verifyNewRegistration, suspendUser, unSuspendUser, getVerificationRequest, getAllFundRaiser, deleteCompany };
