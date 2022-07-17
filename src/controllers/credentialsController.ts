import { Request, Response } from "express";
import credentialServices from "../services/credentialServices.js";


export async function createCredentials(req:Request, res:Response){
    const { userId } = res.locals.userId;
    await credentialServices.createCredential({...req.body, userId:userId});

    res.status(201).send(req.body);
}