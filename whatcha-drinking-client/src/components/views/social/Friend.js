import { useNavigate } from "react-router-dom"
import { deleteFriend } from "../../api/Api"
import { getCurrentUser } from "../../utils/Constants"

export const Friend = ({
    friendfid,
    username,
    firstName,
    lastName,
    profilePic,
    setRefreshDom,
    refreshDom
}) => {
    const navigate = useNavigate()
    const currentUser = getCurrentUser()

    const deleteFriendship = async () => {
        await deleteFriend(currentUser, friendfid)
        await setRefreshDom(!refreshDom)
    }

    return (<>
        <section
            className="friend-request-container">

            <img
                className="friend-request-profile-img"
                onClick={
                    () => {
                        navigate(`/profile/${friendfid}`)
                    }
                }
                src={profilePic}
            />

            <section
                className="friend-request-profile-details">
                <div
                    className="friend-request-profile-username">{username}</div>
                <div
                    className="friend-request-profile-fullname">{`${firstName} ${lastName}`}</div>

                <div
                    className="friend-reqeust-add-friend-bttn"
                    onClick={
                        () => {
                            deleteFriendship()
                        }
                    }
                >Remove Friend</div>

            </section>


        </section>
    </>)
}