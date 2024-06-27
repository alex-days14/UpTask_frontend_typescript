import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmAccountTokenForm, RequestConfirmationCodeForm, SuccessResponse, UserLoginForm, UserRegistrationForm, RecoverAccountForm, ValidateRecoveryTokenForm, ChangePasswordForm, userSchema, DeleteProjectForm } from "../types";

export async function createAccount(formData: UserRegistrationForm){
    try {
        const { data } = await api.post<SuccessResponse>("/auth/create-account", formData);
        if (!data.message) throw new Error("Datos inválidos");
        return data
    } catch (error) {
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function confirmAccount(formData: ConfirmAccountTokenForm){
    try {
        const { data } = await api.post<SuccessResponse>("/auth/confirm-account", formData);
        if (!data.message) throw new Error("Datos inválidos");
        return data
    } catch (error) {
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm){
    try {
        const { data } = await api.post<SuccessResponse>("/auth/request-code", formData);
        if (!data.message) throw new Error("Datos inválidos");
        return data
    } catch (error) {
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function authenticateUser(formData: UserLoginForm){
    try {
        const { data } = await api.post("/auth/login", formData);
        localStorage.setItem("token", data);
        return data
    } catch (error) {
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function recoverAccount(formData: RecoverAccountForm){
    try {
        const { data } = await api.post<SuccessResponse>("/auth/recover-account", formData);
        if (!data.message) throw new Error("Datos inválidos");
        return data
    } catch (error) {
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function validateRecoveryToken(formData: ValidateRecoveryTokenForm){
    try {
        const { data } = await api.post<SuccessResponse>("/auth/recover-account/validate-recovery-token", formData);
        if (!data.message) throw new Error("Datos inválidos");
        return data
    } catch (error) {
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function changePassword({formData, token}: {formData: ChangePasswordForm, token: ValidateRecoveryTokenForm["token"]}){
    try {
        const { data } = await api.post<SuccessResponse>(`/auth/recover-account/change-password/${token}`, formData);
        if (!data.message) throw new Error("Datos inválidos");
        return data
    } catch (error) {
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function getUser(){
    try {
        const { data } = await api.get("/auth/user")
        const response = userSchema.safeParse(data);
        if(response.success){
            return response.data
        }
    } catch (error) {
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function checkPassword(formData: DeleteProjectForm){
    try {
        const { data } = await api.post("/auth/check-password", formData)
        if (!data.message) throw new Error("Datos inválidos");
        return data.message
    } catch (error) {
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}