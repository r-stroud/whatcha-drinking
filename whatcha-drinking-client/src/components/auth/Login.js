import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { emailAuth } from "../utils/emailAuth";
import { googleAuth } from "../utils/googleAuth";
import "./Login.css";

export const Login = ({ setDisplayRegister, displayRegister }) => {

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const [displayLoginForm, setDisplayLoginForm] = useState(0)

    useEffect(
        () => {
            if (displayLoginForm > 0 && displayLoginForm % 2 !== 0) {
                document.getElementById("formLogin").style.left = "0"
                document.getElementById("welcomeEmail").classList.add("welcomeGold")
            } else {
                document.getElementById("formLogin").style.left = "100vw"
                document.getElementById("welcomeEmail").classList.remove("welcomeGold")
            }
        }, [displayLoginForm]
    )

    const navigate = useNavigate();

    const updateLoginEmail = (evt) => {
        const copy = { ...login };
        copy.email = evt.target.value;
        setLogin(copy);
    };

    const updateLoginPassword = (evt) => {
        const copy = { ...login };
        copy.password = evt.target.value;
        setLogin(copy);
    };

    // Login With Email & Password
    const onSubmitLoginEmail = async (e) => {
        e.preventDefault();
        emailAuth.signIn(login, navigate);
    };

    // Login with Google
    const onSubmitLoginGoogle = async () => {
        // setDisplayRegister(true)
        googleAuth.signInRegister(navigate, null, "login");
    };



    return (
        <main className="container--login">
            <section>

                <h2>Sign in to access the best drink recommendation application around!</h2>
                <div className="flex-start">
                    <div>
                        <button
                            id="welcomeEmail"
                            className="welcomeBttn"
                            type="button"
                            onClick={
                                () => {
                                    setDisplayLoginForm(displayLoginForm + 1)
                                }
                            }>Email</button>
                        <button
                            id="welcomeGoogle"
                            className="welcomeBttn"
                            type="button"
                            onClick={onSubmitLoginGoogle}>Google</button>
                    </div>
                </div>
                <form id="formLogin" className="form--login" onSubmit={onSubmitLoginEmail}>


                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input
                            type="email"
                            value={login.email}
                            id="loginEmail"
                            onChange={(evt) => updateLoginEmail(evt)}
                            className="form-control"
                            placeholder="Email address"
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input
                            type="password"
                            value={login.password}
                            id="loginPassword"
                            onChange={(evt) => updateLoginPassword(evt)}
                            className="form-control"
                            placeholder="password"
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset>
                        <div className="flex-start">
                            <button
                                id="signInBttn"
                                type="submit"
                                className="welcomeBttn">
                                Sign in</button>
                            <section id="linkRegister" className="link--register">
                                <Link onClick={
                                    () => {
                                        setDisplayRegister(true)
                                    }
                                }>Not a member yet?</Link>
                            </section>

                        </div>
                    </fieldset>
                </form>
                <img className="login-img" src={require("../../images/tequila.png")} />
            </section>


            {/* <h2>Login With Google?</h2>
            <button type="submit" onClick={onSubmitLoginGoogle}>
                Let's Do It!
            </button> */}
        </main>
    );
};