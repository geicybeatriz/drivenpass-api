import { Documents } from "@prisma/client";
import repoDocuments from "../repositories/docsRepository.js";
import authUtils from "../utils/utils.js";

export type CreateDocumentsData = Omit<Documents, "id">;

async function verifyDocsExist(userId:number, type:string){
    const documentExist = await repoDocuments.findByTypeAndUser(type, userId);
    if(documentExist) throw { type:"conflict", message:"this document already exists"};
    return;
}

async function verifyDocsById(id:number, userId:number){
    const document = await repoDocuments.findDocsByIdAndUser(id, userId);
    if(!document) throw { type:"not found", message:"document not found"};
    return document;
}

async function insertDocument(data: CreateDocumentsData){
    await authUtils.verifyUser(data.userId);
    await verifyDocsExist(data.userId, data.type);
    await repoDocuments.insert(data);
    return;
}

async function getUserDocuments(id:number, userId:number){
    await authUtils.verifyUser(userId);

    if(id){
        const document = await verifyDocsById(id, userId);
        return document;
    }

    const documents = await repoDocuments.findByUserId(userId);
    return documents;
}

async function deleteDocumentsById(id:number, userId:number){
    await authUtils.verifyUser(userId);
    await verifyDocsById(id, userId);
    await repoDocuments.deleteDocument(id);
    return;
}

const docsServices = {
    insertDocument,
    getUserDocuments,
    deleteDocumentsById
};

export default docsServices;