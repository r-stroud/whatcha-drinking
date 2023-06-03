import { useState } from "react"
import "../drinks/Drinks.css"
import { SubMenuView } from "../subMenu/SubMenuView"
import { UserProfileEditProfile } from "./UserProfileEditProfile"
import "./UserProfile.css"

const currentLocation = "userProfile"

export const UserProfileView = () => {

    //display edit user form
    const [editUser, setEditUser] = useState(false)

    return (
        <>
            <SubMenuView
                location={currentLocation}
                setEditUser={setEditUser} />
            <section className="userprofile-view">
                {editUser
                    ? <UserProfileEditProfile />
                    : <></>}

            </section>
        </>
    )
}