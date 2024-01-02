import { noteValidator } from "../../helpers/validator.js";
import { NoteModel } from "../../model/note.js";

export class NoteController {
  create = async (req, res) => {
    try {
      noteValidator.validateAsync(req.body);
      const note = await NoteModel.create({ ...req.body });
      return res.status(201).json(note);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Error creating new note" }).end();
    }
  };

  read = async (req, res) => {
    try {
      const note = await NoteModel.findById(req.params.id);
      if (!note) {
        return res.status(404).end();
      }
      return res.status(200).json(note);
    } catch (err) {
      return res.status(500).json({ message: "Error reading note" }).end();
    }
  };

  list = async (_req, res) => {
    try {
      const notes = await NoteModel.find();
      return res.status(200).json(notes);
    } catch (err) {
      return res.status(500).json({ message: "Error listing notes" }).end();
    }
  };

  update = async (req, res) => {
    try {
      noteValidator.validateAsync(req.body);
      const note = await NoteModel.findByIdAndUpdate(req.params.id, {
        ...req.body,
      });
      return res.status(200).json(note);
    } catch (err) {
      return res.status(500).json({ message: "Error updating note" }).end();
    }
  };

  delete = async (req, res) => {
    try {
      const note = await NoteModel.findByIdAndDelete(req.params.id);
      return res.status(200).json(note);
    } catch (err) {
      return res.status(500).json({ message: "Error deleting note" }).end();
    }
  };
}
