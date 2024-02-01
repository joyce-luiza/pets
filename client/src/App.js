import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import BasePage from "./layout/BasePage";
import Home from "./pages/Home/index.jsx";
import CreateAccount from "./pages/CreateAccount/index.jsx";
import GetUserInfo from "./pages/GetUserInfo/index.jsx";

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
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<BasePage />}>
                            <Route index element={<Home />} />
                            <Route path="login" element={<Home />} />
                            <Route
                                path="register"
                                element={<CreateAccount />}
                            />
                        </Route>
                        <Route path="/user" element={<BasePage />}>
                            <Route path="style" element={<GetUserInfo />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </ConfigProvider>
    );
}
