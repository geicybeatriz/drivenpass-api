import { NextFunction, Request, Response} from "express";

export default function handleErrorsMiddleware(error, req:Request, res:Response, next:NextFunction) {
    if (error.type === "not found") return res.status(404).send(error.message);
    if (error.type === "unprocessable entity") return res.status(422).send(error.message);
    if (error.type === "conflict") return res.status(409).send(error.message);
    if (error.type === "unauthorized") return res.status(401).send(error.message);
    
    return res.sendStatus(500);
}