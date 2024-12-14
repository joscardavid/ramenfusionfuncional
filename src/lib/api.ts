import { config } from '@/config/api';

interface FetchOptions extends RequestInit {
  token?: boolean;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi(endpoint: string, options: FetchOptions = {}): Promise<any> {
  const { token = true, ...fetchOptions } = options;
  const headers = new Headers(fetchOptions.headers);

  if (token) {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }
  }

  const response = await fetch(`${config.apiUrl}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message || 'An error occurred',
      response.status,
      data
    );
  }

  return data;
}

export const api = {
  get: (endpoint: string, options?: FetchOptions) => 
    fetchApi(endpoint, { ...options, method: 'GET' }),
    
  post: (endpoint: string, data: any, options?: FetchOptions) =>
    fetchApi(endpoint, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    }),

  put: (endpoint: string, data: any, options?: FetchOptions) =>
    fetchApi(endpoint, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    }),

  patch: (endpoint: string, data: any, options?: FetchOptions) =>
    fetchApi(endpoint, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    }),

  delete: (endpoint: string, options?: FetchOptions) =>
    fetchApi(endpoint, { ...options, method: 'DELETE' }),
};