import {RegisterFormData} from "./pages/Register.tsx";
import {SignInFormData} from "./pages/SignIn.tsx";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; //"http://localhost:7000"

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
}

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Error during sign out");
    }
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {credentials: "include"})
    if (!response.ok) {
        throw new Error('Token invalid')
    }
    return await response.json()
}