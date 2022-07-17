import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cryptr from "cryptr";

const cryptr = new Cryptr('myTotallySecretKey');

async function encryptPassword(password:string){
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
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
    verifyToken,
    encryptData,
    decryptData
}

export default authUtils;