import { useState, useEffect } from "react"
import { getCurrentUser } from "../../utils/Constants"
import { FriendRequest } from "./FriendRequest"
import { fetchFriends, fetchRequests } from "../../api/Api"
import { Friend } from "./Friend"

export const FriendRequestView = () => {

    const currentUser = getCurrentUser()

    const displayFriendsAndRequests = async () => {
        let friendRequests = await fetchRequests(currentUser)
        let friends = await fetchFriends(currentUser)
        await setRequests(friendRequests)
        await setFriends(friends)
    }

    const [requests, setRequests] = useState([])
    const [friends, setFriends] = useState([])
    const [refreshDom, setRefreshDom] = useState(false)

    useEffect(
        () => {

            displayFriendsAndRequests()

        }, [refreshDom]
    )

    return (<>
        <section
            className="friend-request-view-container">

            <section
                className="friend-request-container-container">
                <div
                    className="friend-request-view-header">
                    <div>
                        Friend Requests
                        <span>
                            {requests.length}
                        </span>
                    </div>
                </div>
                <section
                    className="friend-request-container">
                    {requests.map(x =>

                        <FriendRequest
                            key={x.firebaseId}
                            friendfid={x.firebaseId}
                            username={x.username}
                            firstName={x.firstName}
                            lastName={x.lastName}
                            profilePic={x.profilePic}
                            setRefreshDom={setRefreshDom}
                            refreshDom={refreshDom}
                        />

                    )}
                </section>
            </section>

            <section
                className="friends-container">

                <div
                    className="friends-header">
                    <div>
                        Friends
                        <span>
                            {friends.length}
                        </span>
                    </div>
                </div>
                <section
                    className="friend-request-container">
                    {friends.map(x =>

                        <Friend
                            key={x.firebaseId}
                            friendfid={x.firebaseId}
                            username={x.username}
                            firstName={x.firstName}
                            lastName={x.lastName}
                            profilePic={x.profilePic}
                            setRefreshDom={setRefreshDom}
                            refreshDom={refreshDom}
                        />

                    )}
                </section>

            </section>

        </section>
    </>)
}