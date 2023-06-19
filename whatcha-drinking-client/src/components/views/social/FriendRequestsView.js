import { useState, useEffect } from "react"
import { getCurrentUser } from "../../utils/Constants"
import { FriendRequest } from "./FriendRequest"

export const FriendRequestView = () => {

    const currentUser = getCurrentUser()

    const url = `https://localhost:7189/api/User/friend_requests?userId=${currentUser.uid}`

    const displayRequests = async () => {

        const fetchData = await fetch(`${url}`)
        const fetchJson = await fetchData.json()
        setRequests(fetchJson)

    }

    const [requests, setRequests] = useState([])

    useEffect(
        () => {

            displayRequests()

        }, []
    )

    console.log(requests)

    return (<>
        <section
            className="friend-request-view-container">

            {requests.map(x =>

                <FriendRequest
                    friendfid={x.firebaseId}
                    username={x.username}
                    firstName={x.firstName}
                    lastName={x.lastName}
                    profilePic={x.profilePic}
                />

            )}

        </section>
    </>)
}