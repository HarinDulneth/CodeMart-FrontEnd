/**
 * API Service for CodeMart Frontend
 * Handles all HTTP requests to the backend API
 */

// Use environment variable in production, or relative path in development
const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

/**
 * Get authentication token from localStorage
 */
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

/**
 * Set authentication token in localStorage
 */
export const setAuthToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

/**
 * Get current user from localStorage
 */

export const getCurrentUser = (): any | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Set current user in localStorage
 */
export const setCurrentUser = (user: any | null): void => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

/**
 * Make an API request with authentication
 */
const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Handle unauthorized (401) - token might be expired
    if (response.status === 401) {
      setAuthToken(null);
      setCurrentUser(null);
      // Optionally redirect to login page
      // window.location.href = '/signin';
    }

    // Try to parse JSON response, but handle plain text errors
    let data: any;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Handle plain text error responses
      const text = await response.text();
      data = text ? { message: text } : { message: `HTTP error! status: ${response.status}` };
    }
    
    if (!response.ok) {
      // Extract error message from various response formats
      const errorMessage = data.message || data.error || data.title || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    // Re-throw with a user-friendly message if it's not already an Error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
};

/**
 * API Methods
 */
export const api = {       
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      const response = await apiRequest<{ token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      // Automatically store token on successful login
      if (response.token) {
        setAuthToken(response.token);
        // Fetch user data after login
        try {
          const user = await api.auth.getMe();
          setCurrentUser(user);
          return { token: response.token, user };
        } catch (err) {
          // If getMe fails, still return token
          return { token: response.token, user: null };
        }
      }
      return response;
    },
    getMe: async () => {
      return apiRequest<any>('/auth/me');
    },
    logout: () => {
      setAuthToken(null);
      setCurrentUser(null);
    },
  },

  // User endpoints
  users: {
    getAll: async () => {
      return apiRequest<any[]>('/user/users');
    },
    getById: async (id: string | number) => {
      return apiRequest<any>(`/user/${id}`);
    },
    create: async (userData: any) => {
      return apiRequest<any>('/user/add', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },
    getSelling: async (id: string | number) => {
      return apiRequest<any[]>(`/user/${id}/selling`);
    },
    getWishlist: async (id: string | number) => {
      return apiRequest<any[]>(`/user/${id}/wishlist`);
    },
    getBoughtProjects: async (id: string | number) => {
      return apiRequest<any[]>(`/user/${id}/boughtprojects`);
    },
  },

  // Project endpoints
  projects: {
    getAll: async () => {
      return apiRequest<any[]>('/project/projects');
    },
    getById: async (id: string | number) => {
      return apiRequest<any>(`/project/${id}`);
    },
    create: async (projectData: any) => {
      return apiRequest<any>('/project/createproject', {
        method: 'POST',
        body: JSON.stringify(projectData),
      });
    },
    filterByRating: async (minRating: number) => {
      return apiRequest<any[]>(`/project/filter/rating?minRating=${minRating}`);
    },
    filterByCategory: async (category: string) => {
      return apiRequest<any[]>(`/project/filter/category?category=${category}`);
    },
    filterByPrice: async (minPrice?: number, maxPrice?: number) => {
      const params = new URLSearchParams();
      if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
      if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
      return apiRequest<any[]>(`/project/filter/price?${params.toString()}`);
    },
    search: async (searchTerm: string) => {
      return apiRequest<any[]>(`/project/searchprojects?searchTerm=${encodeURIComponent(searchTerm)}`);
    },
    getOwned: async () => {
      return apiRequest<any[]>('/project/owned');
    },
    getSortedByPrice: async () => {
      return apiRequest<any[]>('/project/sortedbyprice');
    },
    approve: async (id: string | number) => {
      return apiRequest<any>(`/project/approve/${id}`);
    },
    reject: async (id: string | number) => {
      return apiRequest<any>(`/project/reject/${id}`);
    },
  },

  // Order endpoints
  orders: {
    getAll: async () => {
      return apiRequest<any[]>('/order');
    },
    getById: async (id: string | number) => {
      return apiRequest<any>(`/order/${id}`);
    },
    create: async (orderData: any) => {
      return apiRequest<any>('/order/add', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    },
    getProjectCount: async () => {
      return apiRequest<any>('/order/projectcount');
    },
  },

  // Transaction endpoints
  transactions: {
    getAll: async () => {
      return apiRequest<any[]>('/transaction');
    },
    getById: async (id: string | number) => {
      return apiRequest<any>(`/transaction/${id}`);
    },
    getByStatus: async (status: string) => {
      return apiRequest<any[]>(`/transaction/status?status=${status}`);
    },
    getByOrderId: async (orderId: string | number) => {
      return apiRequest<any>(`/transaction/order/${orderId}`);
    },
    create: async (transactionData: any) => {
      return apiRequest<any>('/transaction/add', {
        method: 'POST',
        body: JSON.stringify(transactionData),
      });
    },
    markSuccess: async (id: string | number) => {
      return apiRequest<any>(`/transaction/success/${id}`);
    },
  },

  // Review endpoints
  reviews: {
    getAll: async () => {
      return apiRequest<any[]>('/review');
    },
    getById: async (id: string | number) => {
      return apiRequest<any>(`/review/${id}`);
    },
    getByProject: async (projectId: string | number) => {
      return apiRequest<any[]>(`/review/reviews?projectId=${projectId}`);
    },
    create: async (reviewData: any) => {
      return apiRequest<any>('/review/add', {
        method: 'POST',
        body: JSON.stringify(reviewData),
      });
    },
  },
};

export default api;

