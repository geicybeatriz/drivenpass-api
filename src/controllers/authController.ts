import { Request, Response } from "express";

export async function signUp(req:Request, res:Response){
    console.log(req.body);
    res.sendStatus(201);
}

export async function signIn(req:Request, res:Response){
    console.log(req.body);
    res.status(200).send(req.body);
}