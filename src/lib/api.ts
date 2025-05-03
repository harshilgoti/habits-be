import { API_URL } from "./constants";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  const url = `${API_URL}${endpoint}`;

  const fetchOptions: RequestInit = {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, fetchOptions);
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    return fetchWithAuth("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    return fetchWithAuth("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  me: async () => {
    return fetchWithAuth("/auth/me");
  },

  logout: async () => {
    return fetchWithAuth("/auth/logout");
  },
};

export const dashboardApi = {
  getAll: async () => {
    const response = await fetchWithAuth("/api/data");
    return response?.data;
  },

  getMarketingBudget: async () => {
    const response = await fetchWithAuth("/api/marketing/average-budget");
    return response?.data;
  },

  getEngineeringProjects: async () => {
    const response = await fetchWithAuth("/api/engineering/completed-projects");
    return response?.data;
  },

  getTopManager: async () => {
    const response = await fetchWithAuth("/api/manager/top");
    return response?.data;
  },

  getProjectsWithSameTeam: async () => {
    const response = await fetchWithAuth("/api/projects/same-team");
    return response?.data;
  },

  getDashboardData: async () => {
    const response = await fetchWithAuth("/api/dashboard");
    return response?.data;
  },
};
