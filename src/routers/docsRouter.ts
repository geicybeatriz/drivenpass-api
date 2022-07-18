import { Router } from "express";
import { createDocuments } from "../controllers/docsController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";
import docsSchema from "../schemas/docsSchema.js";

const docsRouter = Router();

docsRouter.post("/documents", tokenValidation, validateSchemas(docsSchema), createDocuments);

export default docsRouter;