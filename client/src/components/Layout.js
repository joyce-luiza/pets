import React from "react";
import NavigationMenu from "./NavigationMenu";
import "./styles/Layout.css";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <NavigationMenu />
            <main className="content">{children}</main>
        </div>
    );
};

export default Layout;
