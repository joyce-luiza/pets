import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import BasePage from "./layout/BasePage";
import Home from "./pages/Home/index.jsx";
import CreateAccount from "./pages/CreateAccount/index.jsx";
import GetUserInfo from "./pages/GetUserInfo/index.jsx";
import { AuthProvider } from "./contexts/AuthContext.js";
import UserProfile from "./pages/UserProfile/index.jsx";
import ProtectedRoute from "./contexts/ProtectedRoute.js";
import Login from "./pages/Login/index.jsx";
import AdminMenuSidebar from "./pages/AdminMenuSidebar/index.jsx";

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
          <AuthProvider>
            <Routes>
              <Route path="/" element={<BasePage />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<CreateAccount />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/user" element={<BasePage />}>
                  <Route path="complement" element={<GetUserInfo />} />
                </Route>
                <Route path="/profile" element={<BasePage />}>
                  <Route index element={<UserProfile />} />
                </Route>
                <Route path="/admin" element={<BasePage />}>
                  <Route path="profile" element={<AdminMenuSidebar />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
}
