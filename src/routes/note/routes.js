import { Router } from "express";
import { Auth } from "../../middlewares/auth.js";
import { NoteController } from "./controller.js";

const noteController = new NoteController();
const router = Router();

router.get("/", noteController.list);
router.get("/:id", noteController.read);

router.post("/", [Auth], noteController.create);

router.patch("/:id", [Auth], noteController.update);

router.delete("/:id", [Auth], noteController.delete);

export { router as NoteRouter };
