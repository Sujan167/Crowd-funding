const asyncHandler = require("express-async-handler");
const { prisma, customSelect, ApiError } = require("../utils");

// -------------------------------------------------------------------
// GET /api/v1/user
const getAllUser = asyncHandler(async (req, res) => {
	const users = await prisma.User.findMany({
		select: customSelect,
	});
	const totalUser = users.length;

	const data = { totalUser, users };
	const finalReply = { message: "Success", data: data };

	// await redisClient.set(req.originalUrl, JSON.stringify(finalReply), "EX", REDIS_TTL);
	res.status(200).json(finalReply);
});

// -------------------------------------------------------------------

// GET /api/v1/user/:id
const getUser = asyncHandler(async (req, res) => {
	const { userId } = req.params;
	if (!userId) {
		return res.json({ message: "userId is required" });
	}
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: customSelect,
	});
	if (user) {
		const finalReply = { message: "Success", data: user };

		// await redisClient.set(req.originalUrl, JSON.stringify(finalReply), "EX", REDIS_TTL);

		res.status(200).json(finalReply);
	} else {
		throw new ApiError(404, "User not found");
	}
});

// -------------------------------------------------------------------

// DELETE /:userId
const deleteUser = asyncHandler(async (req, res) => {
	const { userId } = req.params;

	// await deleteCache("/api/v1/user/", "users", userId);

	const userToDelete = await prisma.User.findUnique({
		where: { id: userId },
		select: customSelect,
	});
	// const include = {}; // Initialize an empty `include` object

	const user = await prisma.User.delete({
		where: { id: userId },

		// include,
	});

	return res.json({ success: true, message: `Deleted user: ${user.name} `, user });
});
// -------------------------------------------------------------------
module.exports = { getAllUser, getUser, deleteUser };
