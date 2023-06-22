import { useEffect, useState } from "react"
import { DrinkImgs, getCurrentUser } from "../../utils/Constants"
import { useNavigate } from "react-router-dom"
import { addFriendRequest, deleteFriend, fetchFriendshipStatus, fetchRecentDrink, fetchUserDetails, fetchUserFriends } from "../../api/Api"

export const PostsUserPreview = ({
    setUserPreview,
    userPreview,
    userId }) => {

    const navigate = useNavigate()
    const currentUser = getCurrentUser()

    //get recent drink and user details

    const getDetails = async () => {
        let recentDrink = await fetchRecentDrink(userId)
        let userDetails = await fetchUserDetails(userId)
        let userFriends = await fetchUserFriends(currentUser)
        await setRecentDrink(recentDrink)
        await setUserDetails(userDetails)
        await setUserFriends(userFriends)

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

    const addFriend = async () => {
        await addFriendRequest(currentUser, userId)
        await setUserPreview(false)
    }

    //delete friend

    const deleteFriendship = async () => {
        await deleteFriend(currentUser, userId)
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
                                            userFriends.find(x => x.firebaseId === userId)
                                                ? deleteFriendship()
                                                : addFriend()
                                        }
                                    }>
                                    {
                                        userFriends.find(x => x.firebaseId === userId)
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