import { SecretNotes } from "@prisma/client";
import repoNotes from "../repositories/notesRepository.js";
import authUtils from "../utils/utils.js";

export type CreateNotesData = Omit<SecretNotes, "id">;

async function createNotes(data:CreateNotesData){
    await authUtils.verifyUser(data.userId);

    const noteExists = await repoNotes.findByLabelAndUser(data.label, data.userId);
    if(noteExists) throw {type:"conflict", message:"this notes already exists"};

    return await repoNotes.insertNotes(data);
}

async function getSecretNotes(id:number, userId:number){
    await authUtils.verifyUser(userId);
    if(id){
        const note = await repoNotes.findByIdAndUser(id, userId);
        if(!note) throw {type:"not found", message:"note not found"};
        return note;
    }

    const notesList = await repoNotes.findByUserId(userId);
    return notesList;
}

async function deleteNotes(id:number, userId:number){
    await authUtils.verifyUser(userId);
    
    const note = await repoNotes.findByIdAndUser(id, userId);
    if(!note) throw {type:"not found", message:"note not found"};

    await repoNotes.deleteNoteById(id);
    return;
}
const notesServices = {
    createNotes,
    getSecretNotes,
    deleteNotes
}

export default notesServices;