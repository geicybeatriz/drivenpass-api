import { Credentials } from "@prisma/client";
import client from "../config/db.js";
import { CreateCredentialsData } from "../services/credentialServices.js";

async function findByLabelAndUserId(label:string, userId:number){
    return await client.credentials.findFirst({
        where: {
            label, userId
        }
    });
}

async function insert (data:CreateCredentialsData){
    await client.credentials.create({
        data:data
    });
}

async function findAllByUser(userId:number){
    return await client.credentials.findMany({
        where:{
            userId:userId
        }
    });
}

async function findByIdAndUser(id:number, userId:number){
    return await client.credentials.findFirst({
        where: {id:id, userId:userId}
    });
}



const repoCredentials = {
    findByLabelAndUserId,
    insert,
    findAllByUser,
    findByIdAndUser
}
export default repoCredentials;
