import { useEffect, useState } from "react"
import { DrinkImgs, getCurrentUser } from "../../utils/Constants"
import { useNavigate } from "react-router-dom"

export const PostsUserPreview = ({
    setUserPreview,
    userPreview,
    userId }) => {

    const navigate = useNavigate()
    const currentUser = getCurrentUser()
    //get recent drink and user details

    const url = `https://localhost:7189/api/Drink/most_recent?userId=${userId}`
    const url2 = `https://localhost:7189/api/User/GetByFirebaseId?firebaseId=${userId}`
    const url3 = `https://localhost:7189/api/User/friends?userId=${currentUser.uid}`

    const getDetails = async () => {

        const fetchData = await fetch(`${url}`)
        const fetchJson = await fetchData.json()
        setRecentDrink(fetchJson)

        const fetchData2 = await fetch(`${url2}`)
        const fetchJson2 = await fetchData2.json()
        setUserDetails(fetchJson2)

        const fetchData3 = await fetch(`${url3}`)
        const fetchJson3 = await fetchData3.json()
        setUserFriends(fetchJson3)

    }

    const [recentDrink, setRecentDrink] = useState({})
    const [userDetails, setUserDetails] = useState({})
    const [userFriends, setUserFriends] = useState([])

    useEffect(
        () => {
            userPreview
                ? getDetails()
                : <></>

        }, [userPreview]
    )

    let drinkDate = new Date(recentDrink.dateTime);

    //drinkSrc
    let imageSrc = DrinkImgs.find(x => x.name === recentDrink.image)

    // display userprofile link

    const [profileLink, setProfileLink] = useState(false)

    //add friend

    const url4 = 'https://localhost:7189/api/User/add_friend'

    const addFriend = async () => {

        await fetch(`${url4}`, {
            method: "POST",
            body: JSON.stringify({
                userId: currentUser.uid,
                friendId: userId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        await setUserPreview(false)
    }

    return (
        <section
            className="post-user-preview-container">


            <section
                className="post-user-preview">

                <section
                    className="post-header">

                    <section
                        className="post-user-preview-close-bttn"
                        onClick={
                            () => {
                                setUserPreview(false)
                            }
                        }>
                        <div>
                            X
                        </div>

                    </section>

                    <section
                        className="post-header-img-container">

                        <img
                            src={userDetails.profilePic}
                            onMouseEnter={
                                () => {
                                    setProfileLink(true)
                                }
                            }


                        />

                        {profileLink
                            ? <div
                                className="post-user-profile-link"
                                onClick={() => {
                                    navigate(`/profile/${userId}`)
                                }}
                                onMouseLeave={
                                    () => {
                                        setProfileLink(false)
                                    }
                                }>
                                View Profile
                            </div>
                            : <></>}

                    </section>

                    <section>
                        <div
                            className="post-username">{userDetails.username}</div>
                        <div
                            className="post-fullname">{`${userDetails.firstName} ${userDetails.lastName}`}
                        </div>

                        <section
                            className="post-add-friend">
                            {userId === currentUser.uid
                                ? <></>
                                : <div
                                    className="post-add-friend-bttn"
                                    onClick={
                                        () => {
                                            userFriends.find(x => x.id === userId)
                                                ? <></>
                                                : addFriend()
                                        }
                                    }>
                                    {
                                        userFriends.find(x => x.id === userId)
                                            ? "Remove"
                                            : "Add Friend"
                                    }
                                </div>}
                        </section>
                    </section>


                </section>

                <section
                    className="post-user-preview-recent">
                    <div
                        className="post-user-preview-recent-title">Most Recent</div>
                    <section
                        className="post-header">

                        <img
                            src={imageSrc === undefined ? "" : imageSrc.src} />

                        <section>
                            <div>
                                <span>{recentDrink.name}</span>
                            </div>
                            <div
                                className="post-user-preview-drink-type">
                                {recentDrink.type}
                            </div>
                        </section>
                        <div
                            className="post-user-preview-recent-datetime">
                            <span>{`${drinkDate.toLocaleDateString()} ${drinkDate.toLocaleTimeString()} `}</span>
                        </div>
                    </section>

                </section>

            </section>

        </section>
    )
}