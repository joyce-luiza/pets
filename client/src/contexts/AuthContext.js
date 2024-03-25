import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosRequest } from "../utils/axiosRequest";
import { useNavigate } from "react-router-dom";

const initUser = {};

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
        if (user && user.token) {
            checkTokenExpiration();
        }
    }, [user]);

    const login = async (email, psw, userType, firstAccess) => {
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
            setUser(response);
            if (firstAccess) {
                navigate("/user/complement");
            } else {
                navigate("/profile");
            }
        } catch (error) {
            throw error;
        }
    };

    const checkTokenExpiration = async () => {
        const { token, type } = user;
        const response = await axiosRequest({
            method: "post",
            path: "/auth/login",
            body: {
                token: token,
                type: type,
            },
        });
        console.log("Validação do token: " + JSON.stringify(response));
        if (!response) {
            logout();
        }
        // if (token) {
        //     const decodedToken = jwtDecode(token);
        //     const tokenExpirationDate = new Date(decodedToken.exp * 1000);
        //     if (tokenExpirationDate < new Date()) {
        //         logout();
        //     }
        // }
    };

    const logout = () => {
        setUser(initUser);
        localStorage.removeItem("user");
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
