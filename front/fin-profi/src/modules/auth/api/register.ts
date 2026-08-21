import { AxiosPromise } from "axios"

import { privateApi } from "@/api/private"

import type { AuthResponse, RegisterRequest } from "./types"

export async function register(data: RegisterRequest): AxiosPromise<AuthResponse> {
    return privateApi.post<AuthResponse>("/auth/register", data)
}