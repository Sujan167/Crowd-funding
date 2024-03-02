// route for user
const router = require("express").Router();
const { getAllUser, getUser, deleteUser } = require("../controllers/user.controller");

router.route("/").get(getAllUser);

router.route("/:userId").get(getUser).delete(deleteUser);

module.exports = router;
