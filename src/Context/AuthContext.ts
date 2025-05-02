import { createContext } from "react";

export interface User {
  _id: string;
  role: "buyer" | "seller" | "admin";
  name?: string;
}

export interface AuthToken {
  token: string | null;
  user: User | null;
}
export interface AuthContextType {
  auth: AuthToken;
  changeAuth: (token: string, user: User) => void;
}
export const AuthContext = createContext<AuthContextType | undefined>({
  auth: { token: null, user: null },
  changeAuth: () => {},
});
