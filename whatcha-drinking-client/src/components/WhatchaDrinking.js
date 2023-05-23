import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register.js";
import { Welcome } from "./auth/Welcome";

export const WhatchaDrinking = () => {
    return (
        <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="*"
                element={
                    <Authorized>
                        <>
                            <ApplicationViews />
                        </>
                    </Authorized>
                }
            />
        </Routes>
    );
};