import { Request, Response } from "express";
import cardsServices from "../services/cardsServices.js";

export async function insertCards(req:Request, res:Response){
    const {userId} = res.locals.userId;
    await cardsServices.createCards({...req.body, userId:userId})
    
    res.sendStatus(201);
}

export async function getCardsByUser(req:Request, res:Response){
    const id = +req.query.id;
    const {userId} = res.locals.userId;
    const cards = await cardsServices.getCardsByUser(id, userId);

    res.status(200).send(cards);

}