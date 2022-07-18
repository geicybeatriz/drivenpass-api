import { Router } from "express";
import { insertCards } from "../controllers/cardsController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.post("/cards", tokenValidation, validateSchemas(cardSchema), insertCards)

export default cardsRouter;