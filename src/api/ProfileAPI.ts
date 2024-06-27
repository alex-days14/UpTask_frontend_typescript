import { isAxiosError } from "axios";
import api from "@/lib/axios";
import type { SuccessResponse, UpdatePasswordForm, UserFormData } from "@/types/index";

export async function updateProfile(formData: UserFormData){
    try {
        const url = `/auth/profile`
        const { data } = await api.put<SuccessResponse>(url, formData)
        if (!data.message) throw new Error("Datos inválidos");
        return data.message
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePassword(formData: UpdatePasswordForm){
    try {
        const url = `/auth/profile/change-password`
        const { data } = await api.post<SuccessResponse>(url, formData)
        if (!data.message) throw new Error("Datos inválidos");
        return data.message
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
    }
}