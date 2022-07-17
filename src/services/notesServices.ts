import { SecretNotes } from "@prisma/client";
import repoNotes from "../repositories/notesRepository.js";
import repoUsers from "../repositories/userRepository.js";
import authUtils from "../utils/utils.js";



export type CreateNotesData = Omit<SecretNotes, "id">;

async function createNotes(data:CreateNotesData){
    const verifyUser = await repoUsers.findById(data.userId);
    if(!verifyUser) throw {type:"not found", message:"user not found"};

    const noteExists = await repoNotes.findByLabelAndUser(data.label, data.userId);
    if(noteExists) throw {type:"conflict", message:"this notes already exists"};

    return await repoNotes.insertNotes(data);
}





const notesServices = {
    createNotes
}

export default notesServices;