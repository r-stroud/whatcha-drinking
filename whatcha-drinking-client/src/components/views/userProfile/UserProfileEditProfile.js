import { useState, useEffect } from "react";
import "../../../images/whiskey_dog1.png"
import { Dog1, Dog2, getCurrentUser } from "../../utils/Constants";
import { UserProfilePreview } from "./UserProfilePreview";
import { UserProfileEditForm } from "./UserProfileEditForm";

export const UserProfileEditProfile = ({
    editUser
}) => {


    //hide profile picture selection

    const hideSelection = () => {
        document.getElementById("userprofileEditPicForm").style.left = "100vw"
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

    const url2 = "https://localhost:7189/api/User/GetByFirebaseId?firebaseId="

    const collectUserInfo = async () => {
        const fetchData = await fetch(`${url2}${currentUser.uid}`)
        const fetchJson = await fetchData.json()
        setUser(fetchJson)
        setInitialUserValue(fetchJson)
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
        const copy = { ...user };
        copy[evt.target.id] = evt.target.value;
        setUser(copy);
    };

    // handles selection of user icon

    const updateSelectedIcon = (evt) => {
        const copy = { ...user };
        copy.profilePic = evt.target.value;
        setUser(copy);
    };



    // updates fullname

    useEffect(
        () => {
            const copy = { ...user };
            copy.fullName = `${copy.firstName} ${copy.lastName}`
            setUser(copy)
        }, [user.firstName, user.lastName]
    )

    // checks if username exists

    const url3 = 'https://localhost:7189/api/User/GetByUsername?username=';

    const checkUsername = (evt) => {
        const fetchUsername = async () => {
            const fetchData = await fetch(`${url3}${evt.target.value}`)
            const fetchJson = await fetchData.json()
            setUsernameAVailability(fetchJson)
        }
        fetchUsername()
    }

    const checkUsernameAndUpdate = (evt) => {
        updateUser(evt)
        checkUsername(evt)
    }

    const [submitable, setSubmitable] = useState(true)
    const [usernameAvailability, setUsernameAVailability] = useState({ username: "." })
    return (
        <>
            <section>
                <div id="userprofilePreview" className="userprofile-preview flex-start">
                    <section
                        style={{
                            position: "relative",
                            height: "100%"
                        }}>
                        <UserProfilePreview
                            initialUserValue={initialUserValue}
                            user={user}
                            setUser={setUser}
                            updateUser={updateUser}
                            checkUsernameAndUpdate={checkUsernameAndUpdate}
                            usernameAvailability={usernameAvailability}
                            editUser={editUser} />
                        <div
                            style={{
                                position: "absolute",
                                bottom: "-50px"
                            }}>
                            <UserProfileEditForm
                                updateSelectedIcon={updateSelectedIcon}
                                hideSelection={hideSelection}
                                setCancelPic={setCancelPic}
                                cancelPic={cancelPic} />
                        </div>
                    </section>
                </div>



            </section>
        </>
    )

}