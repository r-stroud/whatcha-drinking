import { SubMenuView } from "../subMenu/SubMenuView"
import { CreatePost } from "./CreatePost"

export const PostsView = () => {
    const currentLocation = "postView"
    return (
        <>
            <SubMenuView
                location={currentLocation} />

            <CreatePost />
        </>
    )
}