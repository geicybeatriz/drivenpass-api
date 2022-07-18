import { Credentials } from "@prisma/client";
import repoCredentials from "../repositories/credentialsRepository.js";
import authUtils from "../utils/utils.js";

export type CreateCredentialsData = Omit<Credentials, "id">;

function getDecryptedData(data:Credentials[]){
    data.map((item) => {item.password = authUtils.decryptData(item.password)});
    return data;
}

async function createCredential(data:CreateCredentialsData){
    await authUtils.verifyUser(data.userId);
    
    const credentialExists = await repoCredentials.findByLabelAndUserId(data.label, data.userId);
    if(credentialExists) throw {type: "conflict", message:"this credential already exist!"};

    const encryptedPassword = authUtils.encryptData(data.password);

    const newCredential = {
        label:data.label, 
        url:data.url, 
        username:data.username, 
        password:encryptedPassword, 
        userId:data.userId
    };

    await repoCredentials.insert(newCredential);
}

async function findAllCredentials(id:number, userId:number){
    await authUtils.verifyUser(userId);

    if(id){
        const credential = await repoCredentials.findByIdAndUser(id, userId);
        if(!credential) throw {type:"not found", message:"credential not found"};
        const decriptedPassword = authUtils.decryptData(credential.password);
        return {...credential, password:decriptedPassword};
    }
    
    const credentials = await repoCredentials.findAllByUser(userId);
    const credentialsList = getDecryptedData(credentials);
    return credentialsList;
}

async function deleteCredential(id:number, userId:number){
    const verifyCredential = await repoCredentials.findByIdAndUser(id, userId);
    if(!verifyCredential) throw {type:"not found", message:"credential not found"};

    await repoCredentials.deleteCredential(id);
    return;
}

const credentialServices = {
    createCredential,
    findAllCredentials,
    deleteCredential
};

export default credentialServices;