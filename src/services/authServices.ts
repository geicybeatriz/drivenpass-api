import { Sessions, Users } from "@prisma/client";
import repoUsers from "../repositories/userRepository.js";
import * as bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import authUtils from "../utils/utils.js";

export type CreateUserData = Omit<Users, "id">;
export type LoginUser = Omit<CreateUserData, "name">;
export type CreateSessionData = Omit<Sessions, "id">;

async function matchEncriptedPassword(encriptedPassword:string, password:string){
    const checkData = await bcrypt.compare(password, encriptedPassword);
    if(!checkData) throw {type:"unauthorized", message:"incorrect password"};
    return checkData;
}

function generateToken(userId:number){
    const data = { userId };
    const config = {expiresIn:60*60*24};
    const secretKey = process.env.JWT_SECRET;

    const token = jwt.sign(data, secretKey, config);
    return token;
}

async function insertUserData(userData:CreateUserData){
    const user = await repoUsers.findByEmail(userData.email);
    if(user) throw {type:"conflict", message:"email already registered"};

    const hashPassword = await authUtils.encryptPassword(userData.password);

    await repoUsers.insert({name:userData.name, email: userData.email, password: hashPassword});
}

async function getUserData(userData:LoginUser){
    const user = await repoUsers.findByEmail(userData.email);
    if(!user) throw {type:"unauthorized", message:"usuario não cadastrado"}

    await matchEncriptedPassword(user.password, userData.password);

    const token = generateToken(user.id);
    await repoUsers.insertSession({token:token, userId:user.id});
    return token;
}

const authServices = {
    insertUserData,
    getUserData
};

export default authServices;



