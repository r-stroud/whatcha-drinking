import { useState, useEffect } from "react"
import { SubMenuView } from "../../subMenu/SubMenuView"
import { EditPost } from "./EditPost"

export const EditPostsView = () => {

    // current location
    const currentLocation = "editPostView"

    // cancel / create post

    const [createPost, setCreatePost] = useState(false)

    useEffect(
        () => {
            createPost
                ? document.getElementById("createPostView").style.left = "0"
                : document.getElementById("createPostView").style.left = "-100vw"

        }, [createPost]
    )

    useEffect(
        () => {
            setCreatePost(true)
        }, []
    )

    //drink value
    const [searchValue, setSearchValue] = useState("")

    return (
        <>

            <SubMenuView
                location={currentLocation} />
            <section
                className="create-post-view"
                id="createPostView">
                <EditPost
                    createPost={createPost}
                    setCreatePost={setCreatePost}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            </section>
        </>
    )
}