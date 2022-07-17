import { Request, Response } from "express";
import notesServices from "../services/notesServices.js";


export async function createNotes(req:Request, res:Response){
    const {userId} = res.locals.userId;
    await notesServices.createNotes({...req.body, userId:userId})    
    
    res.sendStatus(201);
}