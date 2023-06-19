import { useState, useEffect } from "react"
import { DrinkImgs, getCurrentUser } from "../../utils/Constants"
import { useParams } from "react-router-dom"
import { SummaryDrinkDetails } from "./SummaryDrinkDetails"
import { useNavigate } from "react-router-dom"

export const Summary = ({ id }) => {

    const navigate = useNavigate()
    const currentUser = getCurrentUser()
    // get recent drink and user details

    const url = `https://localhost:7189/api/Drink/most_recent?userId=${id}`
    const url2 = `https://localhost:7189/api/User/GetByFirebaseId?firebaseId=${id}`
    const url3 = `https://localhost:7189/api/Drink/most_tried?userId=${id}`
    const url4 = `https://localhost:7189/api/User/friends?userId=${currentUser.uid}`

    const getDetails = async () => {

        const fetchData = await fetch(`${url}`)
        const fetchJson = await fetchData.json()
        setRecentDrink(fetchJson)

        const fetchData2 = await fetch(`${url2}`)
        const fetchJson2 = await fetchData2.json()
        setUserDetails(fetchJson2)

        const fetchData3 = await fetch(`${url3}`)
        const fetchJson3 = await fetchData3.json()
        setMostTried(fetchJson3)

        const fetchData4 = await fetch(`${url4}`)
        const fetchJson4 = await fetchData4.json()
        setUserFriends(fetchJson4)

    }

    const [mostTried, setMostTried] = useState({})
    const [recentDrink, setRecentDrink] = useState({})
    const [userDetails, setUserDetails] = useState({})
    const [userFriends, setUserFriends] = useState([])

    useEffect(
        () => {

            getDetails()

        }, [id]
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

    const url5 = 'https://localhost:7189/api/User/add_friend'

    const addFriend = async () => {

        await fetch(`${url5}`, {
            method: "POST",
            body: JSON.stringify({
                userId: currentUser.uid,
                friendId: id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        await navigate("/profile")
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
                                            userFriends.find(x => x.id === id)
                                                ? <></>
                                                : addFriend()
                                        }
                                    }>
                                    {
                                        userFriends.find(x => x.id === id)
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