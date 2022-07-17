import { Request, Response } from "express";
import credentialServices from "../services/credentialServices.js";


export async function createCredentials(req:Request, res:Response){
    const { userId } = res.locals.userId;
    await credentialServices.createCredential({...req.body, userId:userId});

    res.status(201).send(req.body);
}

export async function getCredentials(req:Request, res:Response){
    const id = +req.query.id;
    const {userId} = res.locals.userId;
    
    const credentials = await credentialServices.findAllCredentials(id, parseInt(userId))

    res.status(200).send(credentials)
}