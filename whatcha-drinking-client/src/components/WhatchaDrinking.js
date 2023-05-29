import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Welcome } from "./auth/Welcome";
import { Navbar } from "./navbar/Navbar";
import "./WhatchaDrinking.css"

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
                            <section className="application-views">
                                <ApplicationViews />
                            </section>
                        </>
                    </Authorized>
                }
            />
        </Routes>
    );
};