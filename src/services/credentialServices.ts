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

const credentialServices = {
    createCredential
};

export default credentialServices;