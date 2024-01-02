import { Router } from "express";
import { NoteRouter } from "../routes/note/routes.js";
import { UserRouter } from "../routes/user/routes.js";

const router = Router();

router.use("/users", UserRouter);
router.use("/notes", NoteRouter);

export { router as MainRouter };
