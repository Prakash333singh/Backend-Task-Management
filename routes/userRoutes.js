const express = require("express");
const userController = require("../controllers/userController");
const {authValidation} = require("../middlewares/authValidation");

userRouter = express.Router();

userRouter.post("/register", userController.createUser);
userRouter.get("/allUsers", authValidation, userController.allUsers);
userRouter.get("/:id", authValidation, userController.singleUser);
userRouter.delete("/:id", authValidation, userController.deleteUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/logout", authValidation, userController.logoutUser);


module.exports = userRouter;