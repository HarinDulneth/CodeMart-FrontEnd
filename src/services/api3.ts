const API_BASE_URL = "/api";


export const getAuthToken = (): string | null => {
    return localStorage.getItem("authToken");
};


export const setAuthToken = (token: string | null): void => {
    if (token) {
        localStorage.setItem("authToken", token);
    } else {
        localStorage.removeItem("authToken");
    }
} 


export const getCirrentUser = (): any | null => {
    return localStorage.getItem("currentUser");
}


export const setCurrentUser = (user: any | null): void => {
    if (user) {
        localStorage.setItem("currentUser", user);
    } else {
        localStorage.removeItem("currentUser");
    }
};


const apiRequest = async <T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    const token = getAuthToken();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

        if (response.status === 401) {
            setAuthToken(null);
            setCurrentUser(null);
        }

        let data: any;
    }
}


export const api = {
    auth: {
        login: async (email: string, password: string) => {
            const response = await apiRequest<{ token: string }>("auth/login", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            if (response.token) {
                setAuthToken(response.token);
                try {
                    const user = await api.auth.getMe();
                    setCurrentUser(user);
                    return { token: response.token, user}
                } catch (err) {
                    return { token: response.token, user: null}
                }
            }
        }
    }
}