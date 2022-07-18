import { Router } from "express";
import { createDocuments, deleteDocuments, getUserDocuments } from "../controllers/docsController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";
import docsSchema from "../schemas/docsSchema.js";

const docsRouter = Router();

docsRouter.post("/documents", tokenValidation, validateSchemas(docsSchema), createDocuments);
docsRouter.get("/documents", tokenValidation, getUserDocuments);
docsRouter.delete("/documents/:id", tokenValidation, deleteDocuments);

export default docsRouter;