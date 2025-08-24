// Assuming your Manager type is defined elsewhere

import { Manager } from "./manager";

export interface LoginResponse {
  token: string;
  manager: Manager;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  manager: Manager | null;
}