import { Request, Response } from "express";
import authServices from "../services/authServices.js";

export async function signUp(req:Request, res:Response){
    const {name, email, password, confirm_password} = req.body;
    await authServices.insertUserData({name:name, email:email, password:password});
    res.sendStatus(201);
}

export async function signIn(req:Request, res:Response){
    console.log("entrei", req.body)
    const result = await authServices.getUserData(req.body);
    res.status(200).send(result);
}