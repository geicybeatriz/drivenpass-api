import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import router from "./routers/router.js"
import handleErrorsMiddleware from "./middlewares/errorHandleMiddleware.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(handleErrorsMiddleware)

const port = +process.env.PORT || 5000;

app.listen(port, () => 
    console.log(chalk.bold.green(`Server is up and running on port ${port}`))
);
