import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import validateSchemas from "../middlewares/schemaValidationMiddleware.js";
import authSchemas from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchemas(authSchemas.signUpSchema), signUp);
authRouter.post("/sign-in", validateSchemas(authSchemas.signInSchema), signIn);

export default authRouter;