import { useState, useEffect } from "react"
import { DrinkImgs, getCurrentUser } from "../../utils/Constants"
import { SummaryDrinkDetails } from "./SummaryDrinkDetails"
import { useNavigate } from "react-router-dom"
import { addFriendRequest, deleteFriend, fetchMostTried, fetchRecentDrink, fetchUserDetails, fetchUserFriends } from "../../api/Api"

export const Summary = ({ id }) => {

    const navigate = useNavigate()
    const currentUser = getCurrentUser()

    // get recent drink and user details

    const getDetails = async () => {

        let recentDrink = await fetchRecentDrink(id)
        let userDetails = await fetchUserDetails(id)
        let mostTried = await fetchMostTried(id)
        let userFriends = await fetchUserFriends(currentUser)

        await setRecentDrink(recentDrink)
        await setUserDetails(userDetails)
        await setMostTried(mostTried)
        await setUserFriends(userFriends)

    }

    const [mostTried, setMostTried] = useState({})
    const [recentDrink, setRecentDrink] = useState({})
    const [userDetails, setUserDetails] = useState({})
    const [userFriends, setUserFriends] = useState([])
    const [refresh, setRefresh] = useState(false)
    useEffect(
        () => {

            getDetails()

        }, [id, refresh]
    )



    //get time elasped on recent drink

    const [timeElapsed, setTimeElapsed] = useState(0)

    useEffect(
        () => {
            if (recentDrink.dateTime === "") {
                setTimeElapsed("")

            } else {
                let drinkDate = new Date(recentDrink.dateTime);

                let seconds = (new Date() - drinkDate) / 1000
                let minutes = seconds / 60
                let hours = minutes / 60

                if (seconds < 59) {
                    seconds < 1.5
                        ? setTimeElapsed(Math.round(seconds) + " second ago")
                        : setTimeElapsed(Math.round(seconds) + " seconds ago")

                } else if (minutes < 59) {
                    minutes < 1.5
                        ? setTimeElapsed(Math.round(minutes) + " minute ago")
                        : setTimeElapsed(Math.round(minutes) + " minutes ago")
                } else {
                    hours < 1.5
                        ? setTimeElapsed(Math.round(hours) + " hour ago")
                        : setTimeElapsed(Math.round(hours) + " hours ago")
                }
            }
        }, [recentDrink]
    )

    // get times drank on most drank item

    const [timesTried, setTimesTried] = useState(0)

    useEffect(
        () => {
            if (mostTried.timesTried === "") {
                setTimesTried("")
            } else {
                mostTried.timesTried < 2
                    ? setTimesTried(`${mostTried.timesTried} time`)
                    : setTimesTried(`${mostTried.timesTried} times`)
            }

        }, [mostTried]
    )

    //add friend

    const addFriend = async () => {
        await addFriendRequest(currentUser, id)
        await setRefresh(!refresh)
    }

    //delete friend

    const deleteFriendship = async () => {
        await deleteFriend(currentUser, id)
        await setRefresh(!refresh)
    }

    let imageSrc = DrinkImgs.find(x => x.name === recentDrink.image)
    let imageSrc2 = DrinkImgs.find(x => x.name === mostTried.image)

    return (
        <>
            <section
                className="user-profile-summary-container">
                <section
                    className="summary-header">

                    <section
                        className="summary-header-user-details">

                        <img
                            src={userDetails.profilePic} />
                        <section
                            className="summay-username-fullname">
                            <div
                                className="summary-header-username">
                                {userDetails.username}
                            </div>
                            <div
                                className="summary-header-user-fullname">
                                {`${userDetails.firstName} ${userDetails.lastName}`}
                            </div>
                        </section>

                        {/* new */}

                        <section
                            className="summary-add-friend">
                            {id === currentUser.uid
                                ? <></>
                                : <div
                                    className="summary-add-friend-bttn"
                                    onClick={
                                        () => {
                                            userFriends.find(x => x.firebaseId === id)
                                                ? deleteFriendship()
                                                : addFriend()
                                        }
                                    }>
                                    {
                                        userFriends.find(x => x.firebaseId === id)
                                            ? "Remove"
                                            : "Add Friend"
                                    }
                                </div>}
                        </section>

                    </section>

                    <section
                        className="summary-recent-drink-container">
                        <div
                            className="summary-recent-drink-title">Most Recent
                            <span>
                                {timeElapsed}
                            </span>
                        </div>
                        <section
                            className="summary-recent-drink-details">
                            <img
                                src={imageSrc === undefined ? "" : imageSrc.src}
                            />

                            <section>
                                <div
                                    className="summary-recent-drink-name">
                                    {recentDrink.name}
                                </div>
                                <div
                                    className="summary-recent-drink-type">
                                    {recentDrink.type}
                                </div>
                            </section>
                        </section>
                    </section>


                    <section
                        className="summary-recent-drink-container">
                        <div
                            className="summary-recent-drink-title">Most Tried
                            <span>
                                {timesTried}
                            </span>
                        </div>
                        <section
                            className="summary-recent-drink-details">
                            <img
                                src={imageSrc2 === undefined ? "" : imageSrc2.src}
                            />

                            <section>
                                <div
                                    className="summary-recent-drink-name">
                                    {mostTried.name}
                                </div>
                                <div
                                    className="summary-recent-drink-type">
                                    {mostTried.type}
                                </div>
                            </section>
                        </section>

                    </section>

                </section>

            </section>
            <SummaryDrinkDetails
                id={id} />
        </>
    )
}