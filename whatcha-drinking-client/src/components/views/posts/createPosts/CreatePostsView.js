import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { SubMenuView } from "../../subMenu/SubMenuView"
import { CreatePost } from "./CreatePost"

export const CreatePostsView = () => {

    const paramName = useParams().drinkName

    const currentLocation = "postView"

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
                <CreatePost
                    createPost={createPost}
                    setCreatePost={setCreatePost}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    paramName={paramName} />
            </section>
        </>
    )
}