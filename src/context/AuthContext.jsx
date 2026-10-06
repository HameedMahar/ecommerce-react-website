import { createContext, useState,useContext } from "react";
import { set } from "react-hook-form";

const AuthContext = createContext(null);
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null,
  );

  function login(email, password) {
    const Users = JSON.parse(localStorage.getItem("user")) || [];
    const user = Users.find(
      (u) => u.email === email && u.password === password,
    );
    if (user) {
      localStorage.setItem("currentUserEmail", email);
      setUser({ email });
      return { success: true, message: "Login successful" };
    }
    return { success: false, message: "Invalid email or password" };
  }

  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  function signUp(email, password) {
    const User = JSON.parse(localStorage.getItem("user")) || [];
    if (User.some((user) => user.email === email)) {
      return { sucess: false, message: "User already exists" };
    }
    const newUser = { email, password };
    User.push(newUser);
    localStorage.setItem("user", JSON.stringify(User));
    localStorage.setItem("currentUserEmail", email);
    setUser({ email });
    return { success: true, message: "User created successfully" };
  }
  return (
    <AuthContext.Provider value={{ signUp, user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth(){
  const context = useContext(AuthContext);
return context
}