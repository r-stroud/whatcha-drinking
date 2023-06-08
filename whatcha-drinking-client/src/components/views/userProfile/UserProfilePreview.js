import { useState, useEffect } from "react"
import { getCurrentUser } from "../../utils/Constants"
import { useNavigate } from "react-router-dom"
import { UserProfileDrinkPreference } from "./UserProfileDrinkPreference"
export const UserProfilePreview = ({
    user,
    updateUser,
    checkUsernameAndUpdate,
    usernameAvailability,
    initialUserValue,
    setUser }) => {

    // url

    const url = "https://localhost:7189/api/User/update_user"

    const currentUser = getCurrentUser()

    let navigate = useNavigate()

    const updateUserRequest = async () => {
        await fetch(`${url}`, {
            method: "PUT",
            body: JSON.stringify({
                firebaseId: currentUser.uid,
                email: "",
                address: "",
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                profilePic: user.profilePic
            }),
            headers: {
                "Content-Type": "application/json"
            }

        })
        window.location.reload()
    }

    //display current userprofile

    const userProfile = document.getElementById("userprofilePreview")

    if (userProfile) {
        document.getElementById("userprofilePreview").style.top = "23.5vh"
    }

    // edit names
    const [editNames, setEditNames] = useState(false)

    //edit username
    const [editUsername, setEditUsername] = useState(false)

    //cancel edits

    const [cancelUsername, setCancelUsername] = useState(false)

    useEffect(
        () => {
            const userCopy = { ...user }
            const initialCopy = { ...initialUserValue }
            userCopy.username = initialUserValue.username
            setUser(userCopy)
        }, [cancelUsername]
    )

    const [cancelNames, setCancelNames] = useState(false)

    useEffect(
        () => {
            const userCopy = { ...user }
            const initialCopy = { ...initialUserValue }
            userCopy.firstName = initialUserValue.firstName
            userCopy.lastName = initialUserValue.lastName
            setUser(userCopy)
        }, [cancelNames]
    )

    const cancelAll = () => {
        const userCopy = { ...user }
        const initialCopy = { ...initialUserValue }
        userCopy.firstName = initialUserValue.firstName
        userCopy.lastName = initialUserValue.lastName
        userCopy.username = initialUserValue.username
        userCopy.profilePic = initialUserValue.profilePic
        setUser(userCopy)
    }

    return (
        <section className="flex-wrap">
            <section
                style={{
                    marginRight: "10vw",
                    marginBottom: "4vh"
                }}>
                <section className="flex-start userprofile-header-container">
                    <div className="userprofile-header">
                        Current User Profile
                        <span>Click to edit</span>
                    </div>
                    {user.firstName !== initialUserValue.firstName
                        || user.lastName !== initialUserValue.lastName
                        || user.username !== initialUserValue.username
                        || user.profilePic !== initialUserValue.profilePic
                        ? <section className="userprofile-update-container">
                            <div
                                className="userprofile-update-bttn ok"
                                onClick={
                                    () => {
                                        updateUserRequest()
                                    }
                                }
                            >Update</div>
                            <div
                                className="userprofile-update-bttn cancel"
                                onClick={
                                    () => {
                                        cancelAll()
                                    }
                                }
                            >Cancel</div>
                        </section>
                        : <></>}

                </section>
                <div className="flex-start">
                    <img
                        src={user.profilePic}
                        className="userprofile-edit-icon"
                        onClick={
                            () => {
                                document.getElementById("userprofileEditPicForm").style.left = "0"
                            }
                        } />

                    <section>

                        {/* username */}

                        <div
                            onClick={
                                () => {
                                    setEditUsername(true)
                                }
                            }
                            className="userprofile-username">
                            {editUsername
                                ? <></>
                                : user.username}</div>

                        {editUsername
                            ? <>
                                <section className="userprofile-flex">

                                    <form>
                                        <fieldset>
                                            <section className="flex-start">
                                                <label
                                                    className="userprofile-edit-label"
                                                    htmlFor="username">Username</label>
                                                <div
                                                    className="userprofile-unavailble">
                                                    {usernameAvailability.username === user.username
                                                        ? `Unavailable`
                                                        : <></>}</div>
                                            </section>
                                            <input
                                                id="username"
                                                className="userprofile-edit-field"
                                                type="text"
                                                value={user.username}
                                                placeholder={user.username}
                                                onChange={checkUsernameAndUpdate}
                                                minLength={5}
                                                required />
                                        </fieldset>
                                    </form>
                                    {usernameAvailability.username === user.username
                                        ? <></>
                                        :
                                        <>
                                            <div
                                                className="userprofile-edit-names-ok-bttn"
                                                onClick={
                                                    () => {
                                                        setEditUsername(false)
                                                    }
                                                }>OK</div>

                                        </>}
                                    <div
                                        className="userprofile-edit-names-cancel-bttn"
                                        onClick={
                                            () => {
                                                setEditUsername(false)
                                                setCancelUsername(!cancelUsername)

                                            }
                                        }>CANCEL</div>

                                </section>
                            </>
                            : <></>}


                        {/* first and last names */}
                        <div
                            onClick={
                                () => {
                                    setEditNames(true)
                                }
                            }
                            className="userprofile-names">
                            {editNames
                                ? <></>
                                : `${user.firstName} ${user.lastName}`}</div>


                        {editNames ? <section className="userprofile-flex">
                            <form className="flex">
                                <fieldset>
                                    <label
                                        className="userprofile-edit-label"
                                        htmlFor="firstName">First Name</label>
                                    <input
                                        id="firstName"
                                        className="userprofile-edit-field"
                                        type="text"
                                        value={user.firstName}
                                        placeholder={user.firstName}
                                        onChange={updateUser}
                                        minLength={1} />
                                </fieldset>
                                <fieldset>
                                    <label
                                        className="userprofile-edit-label"
                                        htmlFor="lastName">Last Name</label>
                                    <input
                                        id="lastName"
                                        className="userprofile-edit-field"
                                        type="text"
                                        value={user.lastName}
                                        placeholder={user.lastName}
                                        onChange={updateUser}
                                        minLength={1} />


                                </fieldset>

                            </form>
                            <div
                                className="userprofile-edit-names-ok-bttn"
                                onClick={
                                    () => {
                                        setEditNames(false)
                                    }
                                }>OK</div>
                            <div
                                className="userprofile-edit-names-cancel-bttn"
                                onClick={
                                    () => {
                                        setEditNames(false)
                                        setCancelNames(!cancelNames)

                                    }
                                }>CANCEL</div>

                        </section> : <></>}
                    </section>
                </div>
            </section>
            <UserProfileDrinkPreference />
        </section>
    )

}