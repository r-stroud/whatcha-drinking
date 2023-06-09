import { useState, useEffect } from "react"
import { SubMenuView } from "../subMenu/SubMenuView"
import { CreatePost } from "./createPosts/CreatePost"

export const PostsView = () => {

    const currentLocation = "postView"

    return (
        <>

            <SubMenuView
                location={currentLocation} />
        </>
    )
}