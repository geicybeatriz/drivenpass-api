import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cryptr from "cryptr";
import repoUsers from "../repositories/userRepository.js";

const cryptr = new Cryptr('myTotallySecretKey');

async function encryptPassword(password:string){
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

async function verifyUser(userId:number){
    const verifyUser = await repoUsers.findById(userId);
    if(!verifyUser) throw {type:"not found", message:"user not found"};
}

function verifyToken(token:string){
    const secretKey = process.env.JWT_SECRET;
    const verify = jwt.verify(token, secretKey);
    return verify;
}

function encryptData(data:string){
    const encryptedData = cryptr.encrypt(data);
    return encryptedData;
}

function decryptData(encrypted:string){
    const decryptedData = cryptr.decrypt(encrypted);
    return decryptedData;
}


const authUtils = {
    encryptPassword,
    verifyUser,
    verifyToken,
    encryptData,
    decryptData
}

export default authUtils;