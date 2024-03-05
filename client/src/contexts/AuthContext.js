import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosRequest } from "../utils/axiosRequest";
import { useNavigate } from "react-router-dom";

const initUser = {
    user: {},
};

const AuthContext = createContext();

const getInitialState = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : initUser;
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(getInitialState());

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const login = async (email, psw, userType) => {
        try {
            const response = await axiosRequest({
                method: "post",
                path: "/auth/login",
                body: {
                    email: email,
                    password: psw,
                    type: userType,
                },
            });
            const { token } = response;
            setUser(JSON.stringify(response));
            localStorage.setItem("token", token);
            navigate("/profile");
        } catch (error) {
            console.log("Erro ao fazer login: " + error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/register");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
