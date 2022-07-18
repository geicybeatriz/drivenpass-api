import { Request, Response } from "express";
import docsServices from "../services/docsServices.js";

export async function createDocuments(req:Request, res:Response){
    const {userId} = res.locals.userId;
    await docsServices.insertDocument({...req.body, userId:userId});
    
    res.sendStatus(201);
}

export async function getUserDocuments(req:Request, res:Response){
    const id = +req.query.id;
    const {userId} = res.locals.userId;
    const documents = await docsServices.getUserDocuments(id, userId);
    
    res.status(200).send(documents);
}

export async function deleteDocuments(req:Request, res:Response){
    const id = +req.params.id;
    const {userId} = res.locals.userId;
    await docsServices.deleteDocumentsById(id, userId);
    
    res.sendStatus(200);
}