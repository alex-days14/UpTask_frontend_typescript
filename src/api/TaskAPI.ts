import api from "@/lib/axios";
import { taskSchema, type Project, type SuccessResponse, type Task, type TaskFormData } from "../types";
import { isAxiosError } from "axios";

type TaskAPI = {
    formData: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

export async function createTask({ formData, projectId }: Pick<TaskAPI, "formData" | "projectId">){
    try{
        const url = `/projects/${projectId}/tasks`
        const { data } = await api.post<SuccessResponse>(url, formData)
        if (!data.message) throw new Error("Datos inválidos");
        return data
    }
    catch (error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskById({ projectId, taskId }: Pick<TaskAPI, "projectId" | "taskId">){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.get<Task>(url)
        const result = taskSchema.safeParse(data)
        if(result.success){
            return result.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function editTask({ formData, projectId, taskId }: Pick<TaskAPI, "formData" | "projectId" | "taskId">){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.put<SuccessResponse>(url, formData)
        if (!data.message) throw new Error("Datos inválidos");
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteTask({ projectId, taskId }: Pick<TaskAPI, "projectId" | "taskId">){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.delete<SuccessResponse>(url)
        if (!data.message) throw new Error("Datos inválidos");
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateStatus({ status, projectId, taskId }: Pick<TaskAPI, "status" | "projectId" | "taskId">){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.patch<SuccessResponse>(url, { status })
        if (!data.message) throw new Error("Datos inválidos");
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}
