import { Route, Routes, useNavigate } from "react-router-dom";
import { PostsView } from "./posts/PostsView";
import { UserProfileView } from "./userProfile/UserProfileView";
import { DrinkView } from "./drinks/DrinkView";
import { CreatePostsView } from "./posts/createPosts/CreatePostsView";
import { EditPostsView } from "./posts/editPosts/EditPostView";

export const ApplicationViews = () => {
    let navigate = useNavigate();

    return (
        <>
            <Routes>
                <Route path="/" element={<PostsView />} />
                <Route path="/create-post/:drinkName" element={<CreatePostsView />} />
                <Route path="/edit-post/:id" element={<EditPostsView />} />
                <Route path="/profile/:id" element={<UserProfileView />} />
                <Route path="/drinks" element={<DrinkView />} />
            </Routes>
        </>
    );
};