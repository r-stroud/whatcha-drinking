import { Route, Routes, useNavigate } from "react-router-dom";
import { PostsView } from "./PostsView";
import { UserProfileView } from "./UserProfileView";
import { DrinkView } from "./drinks/DrinkView";

export const ApplicationViews = () => {
    let navigate = useNavigate();

    return (
        <>
            <Routes>
                <Route path="/" element={<PostsView />} />
                <Route path="/profile" element={<UserProfileView />} />
                <Route path="/drinks" element={<DrinkView />} />
            </Routes>
        </>
    );
};