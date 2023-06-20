import { useState, useEffect } from "react";
import "../../../images/whiskey_dog1.png"
import { Dog1, getCurrentUser } from "../../utils/Constants";
import { UserProfilePreview } from "./UserProfilePreview";
import { UserProfileEditForm } from "./UserProfileEditForm";
import { SubMenuView } from "../subMenu/SubMenuView";
import { fetchUserDetails, fetchUsername } from "../../api/Api";

export const UserProfileEditProfile = () => {

    // current location

    const currentLocation = "editProfile"

    //hide profile picture selection

    const hideSelection = () => {
        document.getElementById("userprofileEitFormContainer").style.left = "100vw"
    }

    // cancel profile picture selection

    const [cancelPic, setCancelPic] = useState(false)

    useEffect(
        () => {
            const userCopy = { ...user }
            const initialCopy = { ...initialUserValue }
            userCopy.profilePic = initialUserValue.profilePic
            setUser(userCopy)
        }, [cancelPic]
    )

    //User Profile Display
    const currentUser = getCurrentUser()

    const collectUserInfo = async () => {
        let userDetails = await fetchUserDetails(currentUser.uid)
        setUser(userDetails)
        setInitialUserValue(userDetails)
    }

    useEffect(
        () => {
            collectUserInfo()
        }, []
    )

    // update user
    const [initialUserValue, setInitialUserValue] = useState({})

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        fullName: "",
        profilePic: Dog1,
    });

    const updateUser = (evt) => {
        const userCopy = { ...user };
        userCopy[evt.target.id] = evt.target.value;
        setUser(userCopy);
    };

    // handles selection of user icon

    const updateSelectedIcon = (evt) => {
        const userCopy = { ...user };
        userCopy.profilePic = evt.target.value;
        setUser(userCopy);
    };

    //display edit form

    const [displayForm, setDisplayForm] = useState(false)

    useEffect(
        () => {
            setDisplayForm(true)

        }, [initialUserValue]
    )

    useEffect(
        () => {

            displayForm
                ? document.getElementById("userprofilePreview").style.top = "0vh"
                : document.getElementById("userprofilePreview").style.top = "-50vh"

        }, [displayForm]
    )


    // updates fullname

    useEffect(
        () => {
            const userCopy = { ...user };
            userCopy.fullName = `${userCopy.firstName} ${userCopy.lastName}`
            setUser(userCopy)
        }, [user.firstName, user.lastName]
    )

    // checks if username exists

    const checkUsername = (evt) => {
        const usernameFetchCall = async () => {
            let username = await fetchUsername(evt.target.value)
            setUsernameAVailability(username)
        }
        usernameFetchCall()
    }

    const checkUsernameAndUpdate = (evt) => {
        updateUser(evt)
        checkUsername(evt)
    }

    const [usernameAvailability, setUsernameAVailability] = useState({ username: "." })


    return (
        <>
            <section>
                <SubMenuView
                    location={currentLocation} />
                <section
                    className="test">
                    <div id="userprofilePreview" className="userprofile-preview">
                        <section>
                            <UserProfilePreview
                                initialUserValue={initialUserValue}
                                user={user}
                                setUser={setUser}
                                updateUser={updateUser}
                                checkUsernameAndUpdate={checkUsernameAndUpdate}
                                usernameAvailability={usernameAvailability} />
                            <div
                                className="userprofile-edit-form-container"
                                id="userprofileEitFormContainer"
                            >
                                <UserProfileEditForm
                                    updateSelectedIcon={updateSelectedIcon}
                                    hideSelection={hideSelection}
                                    setCancelPic={setCancelPic}
                                    cancelPic={cancelPic} />
                            </div>
                        </section>
                    </div>


                </section>



            </section>
        </>
    )

}