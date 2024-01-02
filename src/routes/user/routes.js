import { Router } from "express";
import { Auth } from "../../middlewares/auth.js";
import { UserController } from "./controller.js";

const userController = new UserController();

const router = Router();

router.get("/", [Auth], userController.me);

router.post("/login", userController.login);
router.post("/register", userController.register);

export { router as UserRouter };
