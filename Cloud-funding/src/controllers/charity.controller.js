const asyncHandler = require("express-async-handler");
const { prisma } = require("../utils");

// -------------------------------------------------------------------

const createCharity = asyncHandler(async (req, res) => {
	const { title, charityAmount, image, description } = req.body;

	if (!title || !charityAmount || !image || !description) {
		return res.json({ success: false, message: "All fields are required" });
	}
	const userRefId = req.user.id;
	const dataToCreate = {
		title,
		charityAmount,
		image,
		description,
		userRefId,
	};
	console.log(dataToCreate);
	const charity = await prisma.Charity.create({
		data: dataToCreate,
	});
	const user = await prisma.user.findUnique({
		// Assuming your user model is named 'user'
		where: { id: userRefId },
	});

	// const messageForQueue = { subject: "Suspended", text: "Thank you for the charity", mailTo: user.email };
	// await produceToQueue("email_queue", JSON.stringify(messageForQueue));

	return res.status(201).json({ success: true, message: "User Suspended", data: charity, user });
});

// -------------------------------------------------------------------

const getAllCharity = asyncHandler(async (req, res) => {
	const allCharity = await prisma.Charity.findMany({});
	return res.status(201).json({ success: true, message: "User Suspended", data: allCharity });
});

// -------------------------------------------------------------------

module.exports = { createCharity, getAllCharity };
