import { Route, Routes, useNavigate } from "react-router-dom";
import { PostsView } from "./posts/PostsView";
import { UserProfileView } from "./userProfile/UserProfileView";
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