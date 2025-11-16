import { Routes, Route, Navigate } from "react-router-dom";
import FormPage from "./pages/form";
import Home from "./pages/home";
import { isUserLoggedIn } from "./utils/auth.js";

export default function App() {
    console.log("Rendering App...");

    return (
        <div className="w-full h-full flex items-center justify-center">

    
        <Routes>
            <Route
                path="/"
                element={
                    (console.log("Rendering FormPage Route"),
                    isUserLoggedIn() ? <Navigate to="/home" /> : <FormPage />)
                }
            />

            <Route
                path="/home"
                element={
                    (console.log("Rendering Home Route"),
                    isUserLoggedIn() ? <Home /> : <Navigate to="/" />)
                }
            />

            <Route
                path="/update"
                element={
                    (console.log("Rendering Update Route"),
                    isUserLoggedIn() ? <FormPage /> : <Navigate to="/" />)
                }
            />
        </Routes>
            </div>
    );
}