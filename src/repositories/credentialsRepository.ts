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
    return;
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

async function deleteCredential(id:number){
    await client.credentials.delete({
        where: {id:id}
    });
    return
}



const repoCredentials = {
    findByLabelAndUserId,
    insert,
    findAllByUser,
    findByIdAndUser,
    deleteCredential
}
export default repoCredentials;
