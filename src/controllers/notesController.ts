import { Request, Response } from "express";
import notesServices from "../services/notesServices.js";


export async function createNotes(req:Request, res:Response){
    const {userId} = res.locals.userId;
    await notesServices.createNotes({...req.body, userId:userId})    
    
    res.sendStatus(201);
}

export async function getSecretNotes(req:Request, res:Response){
    const {userId} = res.locals.userId;
    const id = +req.query.id;

    const notes = await notesServices.getSecretNotes(id, userId);

    res.status(200).send(notes);
}