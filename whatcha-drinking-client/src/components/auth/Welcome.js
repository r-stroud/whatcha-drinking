import { Login } from "./Login"
import { useState, useEffect } from "react"
import { Register } from "./Register.js"
import "./Login.css"

export const Welcome = () => {

    const [displayLogin, setDisplayLogin] = useState(false)
    const [displayRegister, setDisplayRegister] = useState(false)

    useEffect(
        () => {


            //display welcome title
            setTimeout(
                () => {
                    document.getElementById("whatcha").style.right = "0"
                }, 500
            )

            setTimeout(
                () => {
                    document.getElementById("drinking").style.left = "0"
                }, 700
            )

            // display welcome background image
            setTimeout(
                () => {
                    document.getElementById("containerImg").style.top = "0"
                }, 900
            )

            //display buttons
            setTimeout(
                () => {
                    document.getElementById("loginBttn").style.top = "0"
                }, 1100
            )

            setTimeout(
                () => {
                    document.getElementById("registerBttn").style.top = "0"
                }, 1300
            )

        }, []
    )

    useEffect(
        () => {

            window.scrollTo(0, 0)

            setTimeout(() => {
                document.getElementById("loginContainer").style.display = "block"
                document.getElementById("containerImg").style.top = "100vh"
            }, 100)

            if (document.getElementById("loginContainer") !== null) {
                setTimeout(() => {
                    document.getElementById("loginContainer").style.top = "0vh"
                }, 200)
            }

            if (document.getElementById("registerContainer") !== null) {
                setTimeout(() => {
                    document.getElementById("registerContainer").style.top = "100vh"
                    document.getElementById("registerContainer").style.display = "none"
                }, 200)
            }

        }, [displayLogin]
    )

    useEffect(
        () => {

            window.scrollTo(0, 0)

            setTimeout(() => {
                document.getElementById("containerImg").style.top = "100vh"
                document.getElementById("registerContainer").style.display = "block"
            }, 100)

            if (document.getElementById("loginContainer") !== null) {
                setTimeout(() => {
                    document.getElementById("loginContainer").style.top = "100vh"
                    document.getElementById("loginContainer").style.display = "none"
                }, 200)
            }

            if (document.getElementById("registerContainer") !== null) {
                setTimeout(() => {
                    document.getElementById("registerContainer").style.top = "0vh"
                }, 200)
            }

        }, [displayRegister]
    )

    return <>


        <section className="welcome">
            <div id="loginContainer">
                <Login />
            </div>

            <div id="registerContainer">
                <Register />
            </div>
            <div className="flex">

                <div className="title">
                    <h1><span id="whatcha">WHATCHA</span> <span id="drinking">DRINKING</span></h1>
                    <section className="flex">
                        <button
                            id="loginBttn"
                            onClick={
                                () => {
                                    setDisplayLogin(!displayLogin)

                                }
                            }>Login</button>
                        <button
                            id="registerBttn"
                            onClick={
                                () => {
                                    setDisplayRegister(!displayRegister)
                                }
                            }>Register</button>
                    </section>
                </div>

                <div id="containerImg" className="container-img">
                </div>



            </div>

        </section>


    </>
}