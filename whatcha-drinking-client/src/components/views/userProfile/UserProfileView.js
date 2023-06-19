import { useEffect, useState } from "react"
import "../drinks/Drinks.css"
import { SubMenuView } from "../subMenu/SubMenuView"
import { UserProfileEditProfile } from "./UserProfileEditProfile"
import "./UserProfile.css"
import { getCurrentUser } from "../../utils/Constants"
import { useParams } from "react-router-dom"
import { Summary } from "./Summary"





export const UserProfileView = () => {

    //check if user or viewing another user

    let currentLocation = ""

    useEffect(
        () => {
            currentUser.uid === params.id
                ? currentLocation = "userProfile"
                : currentLocation = "friendProfile"
        }, []
    )

    const params = useParams()

    const currentUser = getCurrentUser()



    currentUser.uid === params.id
        ? currentLocation = "userProfile"
        : currentLocation = "friendProfile"

    //display edit user form
    const [editUser, setEditUser] = useState(false)

    return (
        <>
            <SubMenuView
                location={currentLocation}
                setEditUser={setEditUser}
                editUser={editUser} />
            <section className="userprofile-view">
                <Summary
                    id={params.id} />

            </section>
        </>
    )
}