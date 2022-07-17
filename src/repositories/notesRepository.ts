import client from "../config/db.js";
import { CreateNotesData } from "../services/notesServices.js";

async function findByLabelAndUser(label:string, userId:number){
    return await client.secretNotes.findFirst({
        where:{
            label, userId
        }
    });
}

async function insertNotes(data:CreateNotesData){
    await client.secretNotes.create({
        data: data
    });
    return;
}

async function findByIdAndUser(id:number, userId:number){
    return await client.secretNotes.findFirst({
        where:{id, userId}
    });
}

async function findByUserId(userId:number){
    return await client.secretNotes.findMany({
        where:{userId}
    });
}

async function deleteNoteById(id:number){
    await client.secretNotes.delete({
        where: {id}
    });
    return;
}

const repoNotes = {
    findByLabelAndUser,
    insertNotes,
    findByIdAndUser,
    findByUserId,
    deleteNoteById
};

export default repoNotes;