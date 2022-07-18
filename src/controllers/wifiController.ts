import { Request, Response } from "express";
import wifiService from "../services/wifiServices.js";

export async function createWifi(req:Request, res:Response){
    const {userId} = res.locals.userId;

    await wifiService.insertWifi({...req.body, userId:userId});

    res.sendStatus(201);
}

export async function getWifi(req:Request, res:Response){
    const {userId} = res.locals.userId;
    const id = +req.query.id;

    const wifiList = await wifiService.getUserWifi(id, userId);

    res.status(200).send(wifiList);

}

export async function deleteWifiData(req:Request, res:Response){
    const {userId} = res.locals.userId;
    const id = +req.params.id;

    await wifiService.deleteWifi(id, userId);

    res.sendStatus(200);

}