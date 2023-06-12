import { DrinkImgs } from "../../utils/Constants"
import { useEffect, useState } from "react"
import { SubMenuView } from "../subMenu/SubMenuView"
import { Posts } from "./Posts"
import { useNavigate } from "react-router-dom"

export const PostsView = () => {

    //match drink image src
    let imageSrc = DrinkImgs[Math.floor(Math.random() * DrinkImgs.length)]

    console.log(DrinkImgs.length)

    const navigate = useNavigate()

    const currentLocation = "postView"

    //get posts

    const url = "https://localhost:7189/api/Post/get_posts"

    const displayPosts = async () => {

        const fetchData = await fetch(`${url}`)
        const fetchJson = await fetchData.json()
        setPosts(fetchJson)
    }

    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(
        () => {

            displayPosts()

        }, [refresh]
    )



    return (
        <>
            <section
                style={{
                    backgroundColor: "rgb(54,54,54)",
                    minHeight: "100vh"
                }}>
                <SubMenuView
                    location={currentLocation} />
                <section
                    className="post-container">

                    {posts.length < 1
                        ? <>
                            <section
                                className="post"
                                onClick={
                                    () => {
                                        navigate("/drinks")
                                    }
                                }>

                                <section
                                    className="post-drink-img">

                                    <img
                                        src={imageSrc.src} />

                                </section>

                                <section
                                    className="post-header">
                                    No posts have been made
                                </section>
                                <section
                                    className="post-drink-info">
                                    Be the first!

                                </section>
                                <section
                                    className="post-message">
                                    Be the first to create a post!
                                    Check out our drink selection to try something and then post about it!
                                </section>

                            </section>
                        </>
                        : <>
                            {posts.map(x =>
                                <Posts
                                    key={x.id}
                                    id={x.id}
                                    userId={x.userId}
                                    username={x.username}
                                    userFirstName={x.userFirstName}
                                    userLastName={x.userLastName}
                                    userPic={x.userPic}
                                    drinkId={x.drinkId}
                                    drinkName={x.drinkName}
                                    drinkPic={x.drinkPic}
                                    drinkType={x.drinkType}
                                    dateTime={x.dateTime}
                                    picture={x.picture}
                                    message={x.message}
                                    setRefresh={setRefresh}
                                    refresh={refresh} />
                            )}</>}
                </section>

            </section>
        </>
    )
}