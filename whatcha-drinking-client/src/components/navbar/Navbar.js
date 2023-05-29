import { useNavigate } from "react-router-dom";
import { logout } from "../utils/logout";
import { useEffect, useState } from "react"
import { getCurrentUser } from "../utils/Constants"
import "./Navbar.css"


export const Navbar = () => {

    //User Profile Display
    const currentUser = getCurrentUser()

    const url = "https://localhost:7189/api/User/GetByFirebaseId?firebaseId="

    const collectUserInfo = async () => {
        const fetchData = await fetch(`${url}${currentUser.uid}`)
        const fetchJson = await fetchData.json()
        setDisplayUserInfo(fetchJson)
    }

    const [displayUserInfo, setDisplayUserInfo] = useState([])

    // displayUserinfo = {
    //     id: "int",
    //     address: "string",
    //     email: "string",
    //     firebaseId: "string",
    //     firstName: "string",
    //     lastName: "string",
    //     profilePic: "string",
    //     username: "string"
    // }

    useEffect(
        () => {

            collectUserInfo()
        }, []
    )

    //logout
    let navigate = useNavigate();

    const onLogout = () => {
        logout.logout(navigate);
    };


    return (
        <section className="navbar">
            <section className="nav-user-profile">
                <img
                    src={displayUserInfo.profilePic}
                    className="user-icon-small"
                    onClick={
                        () => {
                            navigate("/profile")
                        }
                    }
                />
                <section className="nav-user-details">

                    <div className="nav-username">
                        {displayUserInfo.username}
                    </div>

                    <div className="nav-user-fullname">
                        {`${displayUserInfo.firstName} ${displayUserInfo.lastName}`}
                    </div>

                </section>
            </section>

            <section className="nav-options">
                <button
                    className=""
                    type="submit"
                    onClick={
                        () => {
                            navigate("/")
                        }
                    }>
                    Posts
                </button>
                <button
                    type="submit"
                    onClick={
                        () => {
                            navigate("/drinks")
                        }
                    }>
                    Drink Selection
                </button>
            </section>

            <section className="nav-logout">
                <button
                    type="submit"
                    onClick={onLogout}>
                    Logout
                </button>
            </section>
        </section>
    )
}