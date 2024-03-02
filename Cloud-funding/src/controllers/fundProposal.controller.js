// For other user who are instred in that funding and want to submit proposal to that funding
const asyncHandler = require("express-async-handler");
const { generateReferenceCode, redisClient, prisma, customSelect, produceToQueue } = require("../utils");
const { SUPER_USER_EMAIL, REDIS_TTL } = process.env;
// -------------------------------------------------------------------

// POST /api/v1/propose-fund
// first check whether the user is verified or not
// check whether the opened equity is available or not
// apply the proposal
const fundProposal = asyncHandler(async (req, res) => {
	const { companyPan, equityPercentage, equityAmount } = req.body;
	console.log(req.body);
	if ([companyPan, equityPercentage, equityAmount].some((field) => field?.trim === "")) {
		throw new ApiError(400, "All fields are required");
	}

	const user = req.user;
	const dataToSave = {
		userRefId: user.id,
		companyPan,
		equityAmount,
		equityPercentage,
	};

	const newFund = await prisma.Proposal.create({
		data: dataToSave,
	});
	const finalReply = { message: "Success", data: newFund };

	res.status(200).json(finalReply);
});

// -------------------------------------------------------------------

module.exports = { fundProposal };
