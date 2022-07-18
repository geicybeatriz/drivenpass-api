import { Request, Response } from "express";

export async function insertCards(req:Request, res:Response){
    console.log(req.body);
    
    res.sendStatus(201);
}