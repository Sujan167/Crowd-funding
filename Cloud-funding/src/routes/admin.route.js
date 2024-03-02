const router = require("express").Router();
const { verifyNewRegistration, suspendUser, unSuspendUser, getVerificationRequest, deleteCompany, getAllFundRaiser } = require("../controllers/admin.controller");

router.route("/user/verificaiton-request").get(getVerificationRequest);
router.route("/verify-new-registration").patch(verifyNewRegistration);
router.route("/suspend-user").patch(suspendUser);
router.route("/unsuspend-user").patch(unSuspendUser);
router.route("/delete-company").delete(deleteCompany);
module.exports = router;
