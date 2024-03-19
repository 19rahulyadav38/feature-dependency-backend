const express = require("express");
const featureController = require("../controller/featureController")
const router = express.Router();
const VerifyJwt = require("../middleware/VerifyJwt")

router.post("/login", featureController.loginFeature);
router.get("/read", VerifyJwt, featureController.read);
router.post("/create", VerifyJwt, featureController.create);
router.post("/addDependency", VerifyJwt, featureController.addDependency);
router.patch("/updateFeature", VerifyJwt, featureController.updateFeature);
router.get("/show_graph", VerifyJwt, featureController.showGraph);
router.get("/links", VerifyJwt, featureController.links)
router.patch("/deleteFeature", VerifyJwt, featureController.deleteFeature);
module.exports = router;