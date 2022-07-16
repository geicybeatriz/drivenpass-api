import { Users } from "@prisma/client";
import repoUsers from "../repositories/userRepository.js";
import { encryptPassword } from "../utils/utils.js";

export type CreateUserData = Omit<Users, "id">;

export async function insertUserData(userData:CreateUserData){
    const user = await repoUsers.findByEmail(userData.email);
    if(user) throw {type:"conflict", message:"email already registered"};

    const hashPassword = await encryptPassword(userData.password);

    await repoUsers.insert({name:userData.name, email: userData.email, password: hashPassword});
}


