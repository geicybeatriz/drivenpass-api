import { Router } from "express";
import {createWifi, deleteWifiData, getWifi} from "../controllers/wifiController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import tokenValidation from "../middlewares/tokenValidationMiddleware.js";
import wifiSchema from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post("/wifi", tokenValidation, validateSchemas(wifiSchema), createWifi);
wifiRouter.get("/wifi", tokenValidation, getWifi);
wifiRouter.delete("/wifi/:id", tokenValidation, deleteWifiData);

export default wifiRouter;