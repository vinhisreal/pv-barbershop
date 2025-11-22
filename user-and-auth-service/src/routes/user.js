const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/utils");
const asyncHandler = require("../helpers/async-handler");
const userController = require("../controllers/UserController");

router.post("/other-signin", asyncHandler(userController.signinAnotherWay));
router.post("/other-signup", asyncHandler(userController.signupAnotherWay));

router.post("/signin", asyncHandler(userController.signin));

router.post("/signup", asyncHandler(userController.signup));
router.post("/create-account", asyncHandler(userController.createAccount));
router.get("/find/:id", asyncHandler(userController.find));
router.get("/find-barber", asyncHandler(userController.findAllFreeBarber));
router.get("/find-receptionist", asyncHandler(userController.findReceptionist));
router.get("/barber", asyncHandler(userController.findAllBarber));
router.get("/", asyncHandler(userController.findAll));
router.delete("/:id/:userID", asyncHandler(userController.delete));
router.patch("/:id/:userID", asyncHandler(userController.activate));
router.put("/point", asyncHandler(userController.updatePoint));
router.post("/restore-password", asyncHandler(userController.restorePassword));
router.get("/highlight/:userID", userController.getHighlightImages);
router.post("/highlight/add", userController.addHighlightImage);
router.post("/highlight/remove", userController.removeHighlightImage);

router.use(authentication);
router.post("/logout", asyncHandler(userController.logout));

router.post("/change-password", asyncHandler(userController.changePassword));
router.post("/update", asyncHandler(userController.updateInformation));
router.post("/refresh-token", asyncHandler(userController.refreshToken));

module.exports = router;
