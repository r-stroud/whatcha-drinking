import { useEffect, useState } from "react"
import { DrinkImgs } from "../../utils/Constants"
import { useNavigate } from "react-router-dom"

export const PostsUserPreview = ({
    setUserPreview,
    userPreview,
    userId }) => {

    const navigate = useNavigate()
    //get recent drink and user details

    const url = `https://localhost:7189/api/Drink/most_recent?userId=${userId}`
    const url2 = `https://localhost:7189/api/User/GetByFirebaseId?firebaseId=${userId}`

    const getDetails = async () => {

        const fetchData = await fetch(`${url}`)
        const fetchJson = await fetchData.json()
        setRecentDrink(fetchJson)

        const fetchData2 = await fetch(`${url2}`)
        const fetchJson2 = await fetchData2.json()
        setUserDetails(fetchJson2)

    }

    const [recentDrink, setRecentDrink] = useState({})
    const [userDetails, setUserDetails] = useState({})

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
                            className="post-fullname">{`${userDetails.firstName} ${userDetails.lastName}`}</div>
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