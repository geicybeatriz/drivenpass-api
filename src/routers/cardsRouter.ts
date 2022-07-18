import { Router } from "express";
import { getCardsByUser, insertCards } from "../controllers/cardsController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.post("/cards", tokenValidation, validateSchemas(cardSchema), insertCards);
cardsRouter.get("/cards", tokenValidation, getCardsByUser);

export default cardsRouter;