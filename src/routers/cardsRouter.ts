import { Router } from "express";
import { deleteCard, getCardsByUser, insertCards } from "../controllers/cardsController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.post("/cards", tokenValidation, validateSchemas(cardSchema), insertCards);
cardsRouter.get("/cards", tokenValidation, getCardsByUser);
cardsRouter.delete("/cards/:id", tokenValidation, deleteCard);

export default cardsRouter;