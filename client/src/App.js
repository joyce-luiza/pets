import "./App.css";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/createaccount"
                    element={
                        <Layout>
                            <CreateAccount />
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
