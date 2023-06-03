import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Welcome } from "./auth/Welcome";
import { Navbar } from "./navbar/Navbar";
import { SubMenuView } from "./views/subMenu/SubMenuView";

export const WhatchaDrinking = () => {
    return (
        <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route
                path="*"
                element={
                    <Authorized>
                        <>
                            <Navbar />
                            <ApplicationViews />
                        </>
                    </Authorized>
                }
            />
        </Routes>
    );
};