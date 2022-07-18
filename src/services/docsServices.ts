import { Documents } from "@prisma/client";
import repoDocuments from "../repositories/docsRepository.js";
import authUtils from "../utils/utils.js";

export type CreateDocumentsData = Omit<Documents, "id">;

async function verifyDocsExist(userId:number, type:string){
    const documentExist = await repoDocuments.findByTypeAndUser(type, userId);
    if(documentExist) throw { type:"conflict", message:"this document already exists"};
    return;
}

async function insertDocument(data: CreateDocumentsData){
    await authUtils.verifyUser(data.userId);
    await verifyDocsExist(data.userId, data.type);
    await repoDocuments.insert(data);
    return;
}

const docsServices = {
    insertDocument
};

export default docsServices;