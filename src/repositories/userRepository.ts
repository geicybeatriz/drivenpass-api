import client from "../config/db.js";
import { CreateUserData } from "../services/authServices.js";


async function findByEmail(email:string){
    return await client.users.findFirst({
        where: {email:email}
    
    });
}

async function insert(userData:CreateUserData){
    await client.users.create({
        data:userData
    })
}



const repoUsers = {
    findByEmail,
    insert
}

export default repoUsers;