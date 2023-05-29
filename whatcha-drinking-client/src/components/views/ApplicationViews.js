import { Route, Routes, useNavigate } from "react-router-dom";
import { PostsView } from "./PostsView";
import { UserProfileView } from "./UserProfileView";
import { AlcoholView } from "./AlcoholView";

export const ApplicationViews = () => {
    let navigate = useNavigate();

    return (
        <>
            <Routes>
                <Route path="/" element={<PostsView />} />
                <Route path="/profile" element={<UserProfileView />} />
                <Route path="/drinks" element={<AlcoholView />} />
            </Routes>
        </>
    );
};