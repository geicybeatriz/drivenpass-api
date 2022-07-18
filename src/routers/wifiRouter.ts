import { Router } from "express";
import {createWifi} from "../controllers/wifiController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";
import wifiSchema from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post("/wifi", tokenValidation, validateSchemas(wifiSchema), createWifi);

export default wifiRouter;