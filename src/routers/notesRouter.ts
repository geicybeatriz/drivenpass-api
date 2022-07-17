import { Router } from "express";
import { createNotes, deleteSecretNotes, getSecretNotes } from "../controllers/notesController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";
import notesSchemas from "../schemas/notesSchema.js";

const notesRouter = Router();

notesRouter.post("/notes", tokenValidation, validateSchemas(notesSchemas), createNotes);
notesRouter.get("/notes", tokenValidation, getSecretNotes);
notesRouter.delete("/notes/:id", tokenValidation, deleteSecretNotes)

export default notesRouter;