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
import {
    AdopterAccount,
    OrganizationAccount,
    InvitedAccount,
} from "./pages/CreateAccount/";
import AnimalsList from "./pages/AnimalsList/index.jsx";
import AnimalDetails from "./pages/AnimalDetails/index.jsx";
// import PetDetails from "./pages/PetDetails/index.jsx";

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
                    Typography: {
                        fontSizeHeading1: 56,
                        fontSizeHeading2: 48,
                        fontSizeHeading3: 32,
                        fontSizeHeading4: 24,
                        colorTextHeading: "rgb(51, 51, 51)",
                        colorText: "rgb(130, 130, 130)",
                        fontFamily: "Inter",
                        fontWeightStrong: 500,
                    },
                    Card: {
                        headerHeight: 64,
                        headerFontSize: 64,
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
                                {/* <Route path="pet-details" element={<PetDetails />} /> */}
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
                                <Route
                                    path="invited/:token"
                                    element={<InvitedAccount />}
                                />
                                <Route
                                    path="animals"
                                    element={<AnimalsList />}
                                ></Route>
                                <Route
                                    path="animal/details/:id"
                                    element={<AnimalDetails />}
                                />

                                <Route element={<ProtectedRoute />}>
                                    <Route
                                        path="profile"
                                        element={<UserProfile />}
                                    />
                                </Route>
                            </Route>
                            <Route element={<ProtectedRoute />}>
                                <Route path="/user" element={<BasePage />}>
                                    <Route
                                        path="complement"
                                        element={<GetUserInfo />}
                                    />
                                </Route>
                            </Route>
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </App>
        </ConfigProvider>
    );
}
