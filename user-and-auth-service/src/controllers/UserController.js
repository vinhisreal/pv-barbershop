const userService = require("../services/user");
const { CREATED, SuccessResponse } = require("../core/success-response");
class UserController {
  async signup(req, res, next) {
    new CREATED({
      message: "Registered successfully",
      metadata: await userService.signUp(req.body),
      options: { limit: 10 },
    }).send(res);
  }

  async signin(req, res, next) {
    console.log("req", req);
    new SuccessResponse({
      message: "Login successfully",
      metadata: await userService.signIn(req.body),
    }).send(res);
  }

  async logout(req, res, next) {
    new SuccessResponse({
      message: "Logout successfully",
      metadata: await userService.logOut(req.keyStore),
    }).send(res);
  }

  async refreshToken(req, res, next) {
    new SuccessResponse({
      message: "Refresh token successfully",
      metadata: await userService.refreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  }

  async find(req, res, next) {
    const id = req.params.id;
    new SuccessResponse({
      message: "Find user successfully",
      metadata: await userService.find({
        user_id: id,
      }),
    }).send(res);
  }

  async findAll(req, res, next) {
    const keySearch = req.query.key;
    new SuccessResponse({
      message: "Find user successfully",
      metadata: await userService.findAll(keySearch),
    }).send(res);
  }

  async findAllFreeBarber(req, res, next) {
    const keySearch = req.query.key;
    const timeStart = req.query.startTime;
    const timeEnd = req.query.endTime;
    console.log("controller time", timeStart, timeEnd);
    new SuccessResponse({
      message: "Find user successfully",
      metadata: await userService.findAllFreeBarber(
        keySearch,
        timeStart,
        timeEnd
      ),
    }).send(res);
  }

  async findAllBarber(req, res, next) {
    new SuccessResponse({
      message: "Find all barber successfully",
      metadata: await userService.findAllBarber(),
    }).send(res);
  }

  async findReceptionist(req, res, next) {
    new SuccessResponse({
      message: "Find receptionist successfully",
      metadata: await userService.findReceptionist(),
    }).send(res);
  }

  async findAll(req, res, next) {
    new SuccessResponse({
      message: "Find all barber successfully",
      metadata: await userService.findAll(),
    }).send(res);
  }

  async updateInformation(req, res, next) {
    new SuccessResponse({
      message: "Update information successfully",
      metadata: await userService.updateInformation({
        ...req.body,
      }),
    }).send(res);
  }

  async updatePoint(req, res, next) {
    new SuccessResponse({
      message: "Update point successfully",
      metadata: await userService.updatePoint(req.body),
    }).send(res);
  }

  async delete(req, res, next) {
    const deleteID = req.params.id;
    const userID = req.params.userID;
    new SuccessResponse({
      message: "Delete user successfully",
      metadata: await userService.delete({
        deleteID,
        userID,
      }),
    }).send(res);
  }

  async changePassword(req, res, next) {
    new SuccessResponse({
      message: "Change password successfully",
      metadata: await userService.changePassword(req.body),
    }).send(res);
  }

  async restorePassword(req, res, next) {
    new SuccessResponse({
      message: "Change password successfully",
      metadata: await userService.restorePassword(req.body),
    }).send(res);
  }

  async createAccount(req, res, next) {
    new SuccessResponse({
      message: "Change password successfully",
      metadata: await userService.createAccount(req.body),
    }).send(res);
  }

  async activate(req, res, next) {
    const activateID = req.params.id;
    const userID = req.params.userID;

    new SuccessResponse({
      message: "Activate user successfully",
      metadata: await userService.activate({
        activateID,
        userID,
      }),
    }).send(res);
  }
  async getHighlightImages(req, res) {
    const userID = req.params.userID;

    new SuccessResponse({
      message: "Get highlight images successfully",
      metadata: await userService.getHighlightImages(userID),
    }).send(res);
  }

  // POST /user/highlight/add
  async addHighlightImage(req, res) {
    const { userID, imageUrl } = req.body;

    new SuccessResponse({
      message: "Add highlight image successfully",
      metadata: await userService.addHighlightImage(userID, imageUrl),
    }).send(res);
  }

  // POST /user/highlight/remove
  async removeHighlightImage(req, res) {
    const { userID, imageUrl } = req.body;

    new SuccessResponse({
      message: "Remove highlight image successfully",
      metadata: await userService.removeHighlightImage(userID, imageUrl),
    }).send(res);
  }
}

module.exports = new UserController();
