import { Router } from "express";
import { createCredentials, deleteCredential, getCredentials } from "../controllers/credentialsController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import tokenValidation  from "../middlewares/tokenValidationMiddleware.js";
import credentialSchema from "../schemas/credentialSchemas.js";

const credentialRouter = Router();

credentialRouter.post("/credentials", tokenValidation, validateSchemas(credentialSchema), createCredentials);
credentialRouter.get("/credentials", tokenValidation, getCredentials); 
credentialRouter.delete("/credentials/:id", tokenValidation, deleteCredential)

export default credentialRouter;