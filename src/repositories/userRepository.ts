import client from "../config/db.js";
import { CreateUserData, CreateSessionData } from "../services/authServices.js";


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

async function insertSession(data: CreateSessionData){
    await client.sessions.create({
        data: data
    });
}

async function findById(id:number){
    return await client.users.findFirst({
        where: {
            id
        }
    })
}


const repoUsers = {
    findByEmail,
    insert,
    insertSession,
    findById
}

export default repoUsers;