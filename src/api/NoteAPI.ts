import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, SuccessResponse, Task } from "../types";
import api from "@/lib/axios";

type NoteAPI = {
    formData: NoteFormData
    projectId: Project['_id']
    taskId: Task['_id']
    noteId: Note['_id'] 
}

export async function createNote({ projectId, taskId, formData }: Pick<NoteAPI, 'projectId' | 'taskId' | 'formData'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`
        const { data } = await api.post<SuccessResponse>(url, formData)
        if (!data.message) throw new Error("Datos inválidos");
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeTaskNote({ projectId, taskId, noteId }: Pick<NoteAPI, 'projectId' | 'taskId' | 'noteId'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const { data } = await api.delete<SuccessResponse>(url)
        if (!data.message) throw new Error("Datos inválidos");
        return data.message
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
    }
}