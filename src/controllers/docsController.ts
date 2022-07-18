import { Request, Response } from "express";
import docsServices from "../services/docsServices.js";


export async function createDocuments(req:Request, res:Response){
    const {userId} = res.locals.userId;
    await docsServices.insertDocument({...req.body, userId:userId});
    
    res.sendStatus(201);
}