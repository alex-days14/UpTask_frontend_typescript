import { isAxiosError } from "axios";
import { Project, SuccessResponse, Team, TeamMember, TeamMemberForm, teamMemberSchema, teamSchema } from "../types";
import api from "@/lib/axios";


export async function findUserByEmail({formData, projectId}: {formData: TeamMemberForm, projectId: Project["_id"]}){
    try {
        const { data } = await api.post<TeamMember>(`/projects/${projectId}/team/find`, formData)
        const response = teamMemberSchema.safeParse(data);
        if(response.success){
            return response.data
        }
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function addTeamMember({id, projectId}: {id: TeamMember["_id"], projectId: Project["_id"]}){
    try {
        const { data } = await api.post<SuccessResponse>(`/projects/${projectId}/team`, { id })
        if (!data.message) throw new Error("Datos inválidos");
        return data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function getTeamMembers(projectId: Project["_id"]){
    try {
        const { data } = await api.get<Team>(`/projects/${projectId}/team`)
        const response = teamSchema.safeParse(data);
        if(response.success){
            return response.data
        }
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function removeTeamMember({memberId, projectId}: {memberId: TeamMember["_id"], projectId: Project["_id"]}){
    try {
        const { data } = await api.delete<SuccessResponse>(`/projects/${projectId}/team/${memberId}`)
        if (!data.message) throw new Error("Datos inválidos");
        return data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}