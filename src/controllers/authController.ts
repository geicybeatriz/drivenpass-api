import { Request, Response } from "express";
import { insertUserData } from "../services/authServices.js";

export async function signUp(req:Request, res:Response){
    const {name, email, password, confirm_password} = req.body;
    await insertUserData({name:name, email:email, password:password});
    res.sendStatus(201);
}

export async function signIn(req:Request, res:Response){
    console.log(req.body);
    res.status(200).send(req.body);
}