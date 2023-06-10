import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { SubMenuView } from "../../subMenu/SubMenuView"
import { EditPost } from "./EditPost"

export const EditPostsView = () => {

    const paramId = useParams().id

    // update item

    const displayEditPostInfo = async (id) => {
        const fetchData = await fetch(`https://localhost:7189/api/Post/get_post_by_id?id=${id}`)
        const fetchJson = await fetchData.json()
        setEditPostInfo(fetchJson)
    }

    const [editPostInfo, setEditPostInfo] = useState([])

    useEffect(
        () => {
            displayEditPostInfo(paramId)
        }, []
    )

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

    const [editDetails, setEditDetails] = useState(
        {
            drinkName: "",
            message: ""
        }
    )

    useEffect(
        () => {
            const copy = editDetails
            copy.drinkName = editPostInfo.drinkName
            copy.message = editPostInfo.message
            setEditDetails(copy)

        }, [editPostInfo]
    )

    useEffect(
        () => {

            const drinkName = editDetails.drinkName
            drinkName === undefined
                ? displayEditPostInfo(paramId)
                : setSearchValue(drinkName)

        }, [editPostInfo, editDetails]
    )

    useEffect(
        () => {

            const message = editDetails.message
            message === undefined
                ? displayEditPostInfo(paramId)
                : <></>

        }, [editPostInfo, editDetails]
    )

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
                    paramId={paramId}
                    editDetails={editDetails} />
            </section>
        </>
    )
}