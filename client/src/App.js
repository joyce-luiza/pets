import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider, App } from "antd";
import BasePage from "./layout/BasePage";
import Home from "./pages/Home/index.jsx";
import GetUserInfo from "./pages/GetUserInfo/index.jsx";
import { AuthProvider } from "./contexts/AuthContext.js";
import UserProfile from "./pages/UserProfile/index.jsx";
import ProtectedRoute from "./contexts/ProtectedRoute.js";
import Login from "./pages/Login/index.jsx";
import ChooseAccount from "./pages/ChooseAccount/index.jsx";
import { AdopterAccount, OrganizationAccount } from "./pages/CreateAccount/";

export default function AppRoutes() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#4435ab",
                    colorInfo: "#4435ab",
                    colorBgBase: "#fff",
                    fontSize: 16,
                    borderRadius: 4,
                },
                components: {
                    Form: {
                        labelColor: "#4435ab",
                    },
                },
            }}
        >
            <App>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route path="/" element={<BasePage />}>
                                <Route index element={<Home />} />
                                <Route path="login" element={<Login />} />
                                <Route
                                    path="register"
                                    element={<ChooseAccount />}
                                />
                                <Route
                                    path="adopter"
                                    element={<AdopterAccount />}
                                />
                                <Route
                                    path="organization"
                                    element={<OrganizationAccount />}
                                />
                            </Route>
                            <Route element={<ProtectedRoute />}>
                                <Route path="/user" element={<BasePage />}>
                                    <Route
                                        path="complement"
                                        element={<GetUserInfo />}
                                    />
                                </Route>
                                <Route path="/profile" element={<BasePage />}>
                                    <Route index element={<UserProfile />} />
                                </Route>
                            </Route>
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </App>
        </ConfigProvider>
    );
}
