import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../utils/googleAuth";
import { emailAuth } from "../utils/emailAuth";
import "./Login.css";
import "../../images/whiskey_dog1.png"

// user object
const Dog1 = require("../../images/whiskey_dog1.png")
const Dog2 = require("../../images/whiskey_dog2.png")

export const Register = () => {
    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        fullName: "",
        password: "",
        profilePic: Dog1,
    });


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

    const url = 'https://localhost:7189/api/User/GetByUsername?username=';

    const checkUsername = (evt) => {
        const fetchUsername = async () => {
            const fetchData = await fetch(`${url}${evt.target.value}`)
            const fetchJson = await fetchData.json()
            setUsernameAVailability(fetchJson)
        }
        fetchUsername()
    }

    const checkUsernameAndHandleRegister = (evt) => {
        updateUser(evt)
        checkUsername(evt)
    }

    const [submitable, setSubmitable] = useState(true)
    const [usernameAvailability, setUsernameAVailability] = useState({ username: "." })

    // changes based on selection for regsitering with email or google

    const [registerButtonDisplay, setRegisterButtonDisplay] = useState(true)

    useEffect(
        () => {
            if (registerButtonDisplay) {
                document.getElementById("registerEmail").classList.add("welcomeGold")
                document.getElementById("registerGmail").classList.remove("welcomeGold")
            }

            if (!registerButtonDisplay) {
                document.getElementById("registerGmail").classList.add("welcomeGold")
                document.getElementById("registerEmail").classList.remove("welcomeGold")
            }
        }, [registerButtonDisplay])

    let navigate = useNavigate();

    // Register with email and password
    const handleRegister = async (e) => {
        e.preventDefault();
        emailAuth.register(user, navigate);
    };

    const updateUser = (evt) => {
        const copy = { ...user };
        copy[evt.target.id] = evt.target.value;
        setUser(copy);
    };

    // Register with google (same as sign in)
    const onSubmitLogin = async () => {
        googleAuth.signInRegister(navigate, user, "register");
    };

    return (
        <main>



            <form className="form--register" onSubmit={handleRegister}>
                <section id="registerUserPreview" className="fixed">
                    <h2>Register to access the best drink recommendation application around!</h2>
                    <section
                        className="flex-start">
                        <div
                            id="registerEmail"
                            className="welcomeBttn"
                            onClick={
                                () => {
                                    setRegisterButtonDisplay(true)
                                }
                            }>Register with Email</div>
                        <div
                            id="registerGmail"
                            className="welcomeBttn"
                            onClick={
                                () => {
                                    setRegisterButtonDisplay(false)
                                }
                            }>Register with Google</div>
                    </section>
                    <section className="user-creation-preview">
                        <h3>Preview</h3>
                        <div className="flex-start">
                            <img src={user.profilePic} className="user-icon" />
                            <div>
                                <p>{`${user.firstName} ${user.lastName}`}</p>
                                <p>{user.username}</p>
                            </div>
                        </div>
                    </section>
                </section>
                <h4>Profile Picture</h4>
                <fieldset className="flex-start">

                    <input
                        type="radio"
                        id="whiskeyDog1"
                        className="icon-selection"
                        name="profile-pic"
                        value={Dog1}
                        onClick={updateSelectedIcon}
                    />
                    <label htmlFor="whiskeyDog1">
                        <img
                            className="user-icon"
                            src={require("../../images/whiskey_dog1.png")} />
                    </label>

                    <input
                        type="radio"
                        id="whiskeyDog2"
                        className="icon-selection"
                        name="profile-pic"
                        value={Dog2}
                        onClick={updateSelectedIcon}
                    />
                    <label htmlFor="whiskeyDog2">
                        <img
                            className="user-icon"
                            src={require("../../images/whiskey_dog2.png")} />
                    </label>
                </fieldset>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input
                        onChange={updateUser}
                        type="text"
                        id="firstName"
                        className="form-control"
                        placeholder="Enter your first name"
                        required
                        autoFocus
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input
                        onChange={updateUser}
                        type="text"
                        id="lastName"
                        className="form-control"
                        placeholder="Enter your last name"
                        required
                        autoFocus
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input
                        onChange={checkUsernameAndHandleRegister}
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Enter your username"
                        minLength={5}
                        required
                        autoFocus
                    />
                    <div>{usernameAvailability.username === user.username ? `This username is not available` : <></>}</div>
                </fieldset>

                {registerButtonDisplay
                    ? <fieldset>
                        <label htmlFor="email"> Email address </label>
                        <input
                            onChange={updateUser}
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required
                        />
                    </fieldset>
                    : <></>}

                {/* REGISTER BUTTON */}

                {registerButtonDisplay
                    ? <fieldset>
                        <label htmlFor="password"> Password </label>
                        <input
                            onChange={updateUser}
                            type="text"
                            id="password"
                            className="form-control"
                            placeholder="Must Be 6 Characters"
                            required
                            autoFocus
                        />
                    </fieldset>
                    : <></>}
                <fieldset>

                    {/* ABLE TO REGISTER USING GOOGLE OR EMAIL  */}

                    {registerButtonDisplay
                        ? <button
                            className="welcomeBttn registerBttn"
                            type={usernameAvailability.username === user.username
                                ? "button"
                                : "submit"}> Register</button>
                        : <button
                            className="welcomeBttn registerBttn"
                            type="button"
                            onClick={
                                user.firstName === "" ||
                                    user.lastName === "" ||
                                    user.username === "" ||
                                    user.username.length < 5 ||
                                    usernameAvailability.username === user.username
                                    ? () => { }
                                    : onSubmitLogin}>
                            Register </button>}
                </fieldset>
            </form>
            {/* <h2>Register With Google?</h2>
            <button type="submit" onClick={onSubmitLogin}>
                Let's Do It!
            </button> */}
        </main>
    );
};