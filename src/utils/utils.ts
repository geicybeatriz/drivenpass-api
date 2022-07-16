import * as bcrypt from "bcrypt"

async function encryptPassword(password:string){
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}



const authUtils = {
    encryptPassword
}

export default authUtils;