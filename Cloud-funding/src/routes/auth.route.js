// route for auth
const router = require("express").Router();
const { userRegistration, login } = require("../controllers/auth.controller");
const authenticate = require("../middlewares/authenticate");

router.route("/login").post(login);
router.route("/registration").post(userRegistration);
// router.route("/set-new-password").patch(setNewPassword);

// router.route("/forget-password").get(authenticate, generateOTP).post(authenticate, verifyOTP).patch(authenticate, forgetPassword);

module.exports = router;
