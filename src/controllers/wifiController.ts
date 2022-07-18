import { Request, Response } from "express";
import wifiService from "../services/wifiServices.js";

export async function createWifi(req:Request, res:Response){
    const {userId} = res.locals.userId;

    await wifiService.insertWifi({...req.body, userId:userId});

    res.sendStatus(201);
}