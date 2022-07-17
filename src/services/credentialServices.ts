import { Credentials } from "@prisma/client";
import repoCredentials from "../repositories/credentialsRepository.js";
import repoUsers from "../repositories/userRepository.js";
import authUtils from "../utils/utils.js";

export type CreateCredentialsData = Omit<Credentials, "id">;

async function createCredential(data:CreateCredentialsData){
    await repoUsers.findById(data.userId);
    
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
    const userExist = await repoUsers.findById(userId);
    console.log("user", userExist);

    if(!userExist) throw {type:"not found", message:"user not found"};

    if(id){
        const credential = await repoCredentials.findByIdAndUser(id, userId);
        if(!credential) throw {type:"not found", message:"credential not found"};
        const decriptedPassword = authUtils.decryptData(credential.password);
        return {...credential, password:decriptedPassword};
    }
    
    const credentials = await repoCredentials.findAllByUser(userId);
    const credentialsList = authUtils.getDataWithDecryptedPassword(credentials);
    return credentialsList;
}

const credentialServices = {
    createCredential,
    findAllCredentials
};

export default credentialServices;