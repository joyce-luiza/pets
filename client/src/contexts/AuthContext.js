import React, { createContext, useContext, useState, useEffect } from "react";
import { USER_TYPE } from "../constants";
import { axiosRequest } from "../utils/axiosRequest";
import { useNavigate } from "react-router-dom";
import showMessage from "../utils/Message";
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

    const login = async (email, password, type, firstAccess, token = null) => {
        try {
            const response = await axiosRequest({
                method: "POST",
                path: "/auth/login",
                body: {
                    email,
                    password,
                    type,
                    token,
                },
            });
            setUser(response);
            switch (type) {
                case USER_TYPE.ADOPTER:
                    if (firstAccess) {
                        navigate("/user/complement");
                    } else {
                        navigate("profile");
                    }
                    break;
                case USER_TYPE.ORGANIZATION:
                    navigate("profile");
                    break;
                default:
                    break;
            }
        } catch (error) {
            throw error;
        }
    };

    const checkTokenExpiration = async () => {
        try {
            const { token, type } = user;
            const response = await axiosRequest({
                method: "POST",
                path: "/auth/login",
                body: {
                    token: token,
                    type: type,
                },
            });
        } catch (error) {
            showMessage("error", error);
            logout();
        }
    };

    const logout = () => {
        setUser(initUser);
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
