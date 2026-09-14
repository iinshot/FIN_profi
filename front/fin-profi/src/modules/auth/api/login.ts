import { AxiosPromise } from "axios"

import { publicApi } from "@/api/public"

import type { AuthResponse, LoginRequest } from "./types"

export async function login(data: LoginRequest): AxiosPromise<AuthResponse> {
    return publicApi.post<AuthResponse>('/auth/login', data)
}