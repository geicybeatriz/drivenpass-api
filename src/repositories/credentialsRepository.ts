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



const repoCredentials = {
    findByLabelAndUserId,
    insert
}
export default repoCredentials;
