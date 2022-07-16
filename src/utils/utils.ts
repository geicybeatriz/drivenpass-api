import * as bcrypt from "bcrypt"

export async function encryptPassword(password:string){
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}