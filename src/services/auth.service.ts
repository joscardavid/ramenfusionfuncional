import { api } from '../lib/api';
import { API_ENDPOINTS } from '../config/api';
import type { LoginCredentials, AuthResponse } from '../types/admin';

export const AuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return api.post(API_ENDPOINTS.auth.login, credentials, { token: false });
  },

  async register(data: LoginCredentials & { name: string }): Promise<AuthResponse> {
    return api.post(API_ENDPOINTS.auth.register, data, { token: false });
  },
};