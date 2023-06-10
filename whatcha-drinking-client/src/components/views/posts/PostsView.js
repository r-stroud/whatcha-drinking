
import { useEffect, useState } from "react"
import { SubMenuView } from "../subMenu/SubMenuView"
import { Posts } from "./Posts"

export const PostsView = () => {

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
                    )}
                </section>
            </section>
        </>
    )
}