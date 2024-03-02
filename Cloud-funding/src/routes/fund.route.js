// route for user
const router = require("express").Router();
// const { raiseFund } = require("../controllers/fundRaiser.controller");
const { myAllFund, getAllFundRaiser, raiseFund, item, deleteCompany } = require("../controllers/fundRaiser.controller");
const { fundProposal } = require("../controllers/fundProposal.controller");
router.route("/").get(getAllFundRaiser);
router.route("/get-my-fund").get(myAllFund);
router.route("/all").get(item);
router.route("/propose-fund").post(fundProposal);
// router.route("/:userId").get(getUser).delete(deleteUser);
router.route("/raise-fund").post(raiseFund);


module.exports = router;
