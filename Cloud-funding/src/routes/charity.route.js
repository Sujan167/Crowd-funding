const router = require("express").Router();
const { createCharity, getAllCharity } = require("../controllers/charity.controller");
router.route("/").get(getAllCharity);
router.route("/").post(createCharity);

module.exports = router;
