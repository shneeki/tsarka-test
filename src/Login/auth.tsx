import * as React from "react";
import { useLoginMutation } from "./Apollo/LoginMutation";

interface AuthContextType {
  login: any;
  // signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [login] = useLoginMutation();
  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return React.useContext(AuthContext);
};

export { useAuth, AuthProvider };
