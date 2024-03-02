const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { SUPER_USER_EMAIL } = process.env;
const { generateAccessToken, prisma, ApiError } = require("../utils");

// ===================================================================

// Hash the password
async function hashedPassword(password) {
	return await bcrypt.hash(password, 10);
}

// -------------------------------------------------------------------

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const { id, referenceKey } = req.query;

	if (id && referenceKey) {
		const tempUser = await prisma.User.findUnique({
			where: { id },
		});
		const hashPass = await hashedPassword(password);

		if (tempUser.referenceKey === referenceKey) {
			await prisma.User.update({
				where: { id: tempUser.id },
				data: { password: hashPass, referenceKey: "" },
			});
			return res.status(200).json({ success: true, message: "New Password is set!" });
		}
	}

	if (!email || !password) {
		return res.json({ success: false, message: "All fields are required." });
	}

	// Implement user authentication and Prisma query
	const user = await prisma.User.findUnique({
		where: {
			email: email,
		},
	});

	// if (!user.verified) {
	// 	return res.status(403).json({ success: false, message: "You are not verified yet | please wait until admin verify you" });
	// }

	// if (user.suspended) {
	// 	return res.status(403).json({ success: false, message: "Access Denied. User is suspeneded" });
	// }

	if (user && bcrypt.compareSync(password, user.password)) {
		//generate accessToken
		const { token } = await generateAccessToken(user);

		console.log(`\ntoken: ${token}\n`);

		user.password = undefined; //don't send password to the client
		user.updated_at = undefined;
		if (user.refreshToken) {
			user.refreshToken = undefined;
		}

		return res.status(200).json({ user, token });
	} else {
		res.status(401).json({ success: false, message: "Authentication failed" });
	}
});

// -------------------------------------------------------------------

// POST /api/v1/auth/user/registration
const userRegistration = asyncHandler(async (req, res) => {
	const userData = req.body;

	const { name, contactNumber, email, password } = userData;

	if ([name, contactNumber, email, password].some((field) => field?.trim === "")) {
		throw new ApiError(400, "All fields are required");
	}
	const isUserExist = await prisma.User.findUnique({
		// where: { OR: [{ email }, { phoneNumber }] },
		where: { email },
	});

	if (isUserExist) {
		return res.status(400).json({ success: false, message: "User Already Exist" });
	}

	if (email === SUPER_USER_EMAIL) {
		var role = "ADMIN";
	}
	console.log(`\nPassoword:: ${password}\n`);

	// Hash the password before saving it to the database
	const hashedPass = await hashedPassword(password);

	const userDataToCreate = {
		name,
		contactNumber,
		email,
		password: hashedPass,
		role: role ? role : "USER",
	};

	const newUser = await prisma.User.create({
		data: userDataToCreate,
	});

	console.log(`\nuserID:: ${newUser.id}\n`);
	newUser.password = undefined;
	newUser.updated_at = undefined;

	// set userId inside body in order pass to other functions
	req.body.userId = newUser.id;

	const finalReply = { success: true, message: `New User Created`, data: newUser };
	// await redisClient.set(req.originalUrl, JSON.stringify(finalReply), "EX", REDIS_TTL);
	return res.status(200).json(finalReply);
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

module.exports = { userRegistration, login };
