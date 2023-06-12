import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../utils/googleAuth";
import { emailAuth } from "../utils/emailAuth";
import "./Login.css";
import { Dog1, Dog2, Liz1, Liz2, Cat1, Cat2, Bird1, Bird2 } from "../utils/Constants";


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
                        <div
                            className="user-creation-preview-title">
                            Preview</div>
                        <div className="flex-start">
                            <img src={user.profilePic} className="user-icon" />
                            <div>
                                <p
                                    className="user-creation-preview-username">
                                    {user.username}</p>
                                <p
                                    className="user-creation-preview-fullname">
                                    {`${user.firstName} ${user.lastName}`}</p>

                            </div>
                        </div>
                    </section>
                </section>
                <h4>Profile Picture</h4>
                <fieldset className="flex-start-wrap">
                    <section className="flex-start">
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
                                src={Dog1} />
                        </label>
                    </section>
                    <section className="flex-start">
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
                                src={Dog2} />
                        </label>
                    </section>
                    <section className="flex-start">
                        <input
                            type="radio"
                            id="whiskeyLiz1"
                            className="icon-selection"
                            name="profile-pic"
                            value={Liz1}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyLiz1">
                            <img
                                className="user-icon"
                                src={Liz1} />
                        </label>
                    </section>
                    <section className="flex-start">
                        <input
                            type="radio"
                            id="whiskeyLiz2"
                            className="icon-selection"
                            name="profile-pic"
                            value={Liz2}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyLiz2">
                            <img
                                className="user-icon"
                                src={Liz2} />
                        </label>
                    </section>
                    <section className="flex-start">
                        <input
                            type="radio"
                            id="whiskeyCat1"
                            className="icon-selection"
                            name="profile-pic"
                            value={Cat1}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyCat1">
                            <img
                                className="user-icon"
                                src={Cat1} />
                        </label>
                    </section>
                    <section className="flex-start">
                        <input
                            type="radio"
                            id="whiskeyCat2"
                            className="icon-selection"
                            name="profile-pic"
                            value={Cat2}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyCat2">
                            <img
                                className="user-icon"
                                src={Cat2} />
                        </label>
                    </section>
                    <section className="flex-start">
                        <input
                            type="radio"
                            id="whiskeyBird1"
                            className="icon-selection"
                            name="profile-pic"
                            value={Bird1}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyBird1">
                            <img
                                className="user-icon"
                                src={Bird1} />
                        </label>
                    </section>
                    <section className="flex-start">
                        <input
                            type="radio"
                            id="whiskeyBird2"
                            className="icon-selection"
                            name="profile-pic"
                            value={Bird2}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyBird2">
                            <img
                                className="user-icon"
                                src={Bird2} />
                        </label>
                    </section>

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
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username
                        <span
                            className="register-form-username-availability">
                            {usernameAvailability.username === user.username
                                ? `This username is not available`
                                : <></>}
                        </span>
                    </label>
                    <input
                        onChange={checkUsernameAndHandleRegister}
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Enter your username"
                        minLength={5}
                        required
                    />
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
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Must Be 6 Characters"
                            required
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
        </main>
    );
};