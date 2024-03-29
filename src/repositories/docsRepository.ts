import client from "../config/db.js";
import { CreateDocumentsData } from "../services/docsServices.js";

async function findDocsByIdAndUser(id:number, userId:number){
    return await client.documents.findFirst({
        where:{id:id, userId:userId}
    });
}

async function findByUserId(userId:number){
    return await client.documents.findMany({
        where: {userId:userId}
    });
}

async function findByTypeAndUser(type:string, userId:number){
    return await client.documents.findFirst({
        where: {
            userId:userId, type:type
        }
    });
}

async function insert(data:CreateDocumentsData){
    await client.documents.create({
        data:data
    });
    return;
}

async function deleteDocument(id:number){
    await client.documents.delete({
        where: {id:id}
    });
    return;
}

const repoDocuments = {
    findByTypeAndUser,
    findDocsByIdAndUser,
    insert,
    findByUserId,
    deleteDocument
}

export default repoDocuments;