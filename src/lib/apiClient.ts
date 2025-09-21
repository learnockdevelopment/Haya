// API Client with automatic API key inclusion
// This API key is used by the frontend to access the API
const API_KEY = 'c542e686791fd09b7720e494c894bd42c5faa8a98f19754a9798ea96976c1a4c';

interface ApiRequestOptions extends RequestInit {
  requireAuth?: boolean;
  token?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: ApiRequestOptions = {}
  ): Promise<T> {
    const { requireAuth = false, token, ...fetchOptions } = options;
    
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    // Only add API key if it's enabled
    if (process.env.NEXT_PUBLIC_API_KEY_ENABLED === 'true') {
      headers['x-api-key'] = process.env.NEXT_PUBLIC_API_KEY || API_KEY;
    }

    // Add authorization header if required
    if (requireAuth && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // GET request
  async get<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  // POST request
  async post<T>(endpoint: string, data?: any, options: ApiRequestOptions = {}): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any, options: ApiRequestOptions = {}): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any, options: ApiRequestOptions = {}): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Create a default instance
const apiClient = new ApiClient();

export default apiClient;
export { ApiClient };
