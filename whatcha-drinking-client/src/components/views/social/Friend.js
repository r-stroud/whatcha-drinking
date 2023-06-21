import { useNavigate } from "react-router-dom"

export const Friend = ({
    friendfid,
    username,
    firstName,
    lastName,
    profilePic
}) => {
    const navigate = useNavigate()

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

                        }
                    }
                >Remove Friend</div>

            </section>


        </section>
    </>)
}