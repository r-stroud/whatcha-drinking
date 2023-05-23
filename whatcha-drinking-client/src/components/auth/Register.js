import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../utils/googleAuth";
import { emailAuth } from "../utils/emailAuth";
import "./Login.css";

export const Register = () => {
    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        fullName: "",
        password: "",
    });

    useEffect(
        () => {
            const copy = { ...user };
            copy.fullName = `${copy.firstName} ${copy.lastName}`
            setUser(copy)
        }, [user.firstName, user.lastName]
    )

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

    const [registerButtonDisplay, setRegisterButtonDisplay] = useState(true)

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
        googleAuth.signInRegister(navigate, user);
    };

    return (
        <main style={{ textAlign: "center" }}>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
                <section
                    className="flex">
                    <div
                        onClick={
                            () => {
                                setRegisterButtonDisplay(true)
                            }
                        }>Register with Email</div>
                    <div
                        onClick={
                            () => {
                                setRegisterButtonDisplay(false)
                            }
                        }>Register with Gmail</div>
                </section>
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
                {registerButtonDisplay ? <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input
                        onChange={updateUser}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required
                    />
                </fieldset> : <></>}

                {/* REGISTER BUTTON */}

                {registerButtonDisplay ? <fieldset>
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
                </fieldset> : <></>}
                <fieldset>

                    {/* ABLE TO REGISTER USING GOOGLE OR EMAIL  */}

                    {registerButtonDisplay
                        ? <button type={usernameAvailability.username === user.username
                            ? "button"
                            : "submit"}> Register</button>
                        : <div onClick={
                            user.firstName === "" ||
                                user.lastName === "" ||
                                user.username === "" ||
                                user.username.length < 5 ||
                                usernameAvailability.username === user.username
                                ? () => { }
                                : onSubmitLogin}>
                            Register </div>}
                </fieldset>
            </form>
            {/* <h2>Register With Google?</h2>
            <button type="submit" onClick={onSubmitLogin}>
                Let's Do It!
            </button> */}
        </main>
    );
};