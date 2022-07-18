import { Request, Response } from "express";
import cardsServices from "../services/cardsServices.js";

export async function insertCards(req:Request, res:Response){
    //console.log(req.body);
    const {userId} = res.locals.userId;
    await cardsServices.createCards({...req.body, userId:userId})
    
    res.sendStatus(201);
}