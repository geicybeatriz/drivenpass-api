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

const repoNotes = {
    findByLabelAndUser,
    insertNotes,
    findByIdAndUser,
    findByUserId
};

export default repoNotes;