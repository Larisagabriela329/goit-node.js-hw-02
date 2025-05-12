const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const auth = require("../../middleware/auth");


router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);
router.get("/logout", auth, ctrl.logout);
router.get("/current", auth, ctrl.getCurrent);
router.patch("/", auth, ctrl.updateSubscription);

module.exports = router;
