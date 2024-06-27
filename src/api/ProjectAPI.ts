import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { projectFormSchema, projectSchema, projectsSchema } from "@/types/index";
import type { Project, ProjectFormData, SuccessResponse } from "@/types/index"

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post("/projects", formData);
        if (!data.message) throw new Error("Datos inválidos");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getAllProjects() {
    try {
        const { data } = await api.get("/projects");
        const result = projectsSchema.safeParse(data);
        if (!result.success) throw new Error("Datos inválidos");
        return result.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjectById(id: Project["_id"]) {
    try {
        const { data } = await api.get<Project>(`/projects/${id}`);
        const result = projectFormSchema.safeParse(data);
        if (!result.success) throw new Error("Datos inválidos");
        return result.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjectInfo(id: Project["_id"]) {
    try {
        const { data } = await api.get<Project>(`/projects/${id}`);
        const result = projectSchema.safeParse(data);
        if (!result.success) throw new Error("Datos inválidos");
        return result.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

type ProjectAPI = {
    formData: ProjectFormData
    projectId: Project["_id"]
}

export async function updateProject({formData, projectId}: ProjectAPI) {
    try {
        const result = projectFormSchema.safeParse(formData);
        if(!result.success) throw new Error("Datos inválidos");
        const { data } = await api.put<SuccessResponse>(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteProject(id: Project["_id"]) {
    try {
        const { data } = await api.delete<SuccessResponse>(`/projects/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
