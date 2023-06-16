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

            setTimeout(() => {
                document.getElementById("whatcha").style.transition = "0s"
                document.getElementById("drinking").style.transition = "0s"
                document.getElementById("containerImg").style.transition = "0s"
                document.getElementById("loginBttn").style.transition = "0s"
                document.getElementById("registerBttn").style.transition = "0s"

            }, 1400)

        }, []
    )

    useEffect(
        () => {

            if (displayLogin) {
                window.scrollTo(0, 0)

                document.getElementById("containerImg").style.transition = "0.3s"

                setTimeout(() => {
                    document.getElementById("containerImg").style.borderLeft = "rgb(210, 178, 98) 0px solid"
                    document.getElementById("containerImg").style.borderRight = "rgb(210, 178, 98) 5px solid"
                    document.getElementById("loginContainer").style.display = "block"
                    document.getElementById("containerImg").style.right = "50vw"
                    document.getElementById("whatchaDrinking").style.color = "rgb(252, 252, 252)"
                    document.getElementById("registerBttn").classList.remove("welcomeGold")
                    document.getElementById("loginBttn").classList.add("welcomeGold")
                }, 100)

                setTimeout(() => {
                    document.getElementById("containerImg").style.transition = "0s"
                }, 200)

                if (document.getElementById("loginContainer") !== null) {
                    setTimeout(() => {
                        document.getElementById("loginContainer").style.top = "0vh"
                    }, 200)
                }

                if (document.getElementById("registerContainer") !== null) {
                    setTimeout(() => {
                        document.getElementById("registerContainer").style.top = "100vh"
                        document.getElementById("registerUserPreview").style.top = "-80vh"
                        document.getElementById("registerContainer").style.display = "none"
                    }, 200)
                }

                setDisplayRegister(false)
            }
        }, [displayLogin]
    )

    useEffect(
        () => {

            if (displayRegister) {
                window.scrollTo(0, 0)

                document.getElementById("containerImg").style.transition = "0.3s"

                setTimeout(() => {
                    document.getElementById("containerImg").style.borderLeft = "rgb(210, 178, 98) 0px solid"
                    document.getElementById("containerImg").style.borderRight = "rgb(210, 178, 98) 5px solid"
                    document.getElementById("containerImg").style.right = "50vw"
                    document.getElementById("whatchaDrinking").style.color = "rgb(252, 252, 252)"
                    document.getElementById("loginBttn").classList.remove("welcomeGold")
                    document.getElementById("registerBttn").classList.add("welcomeGold")
                    document.getElementById("registerContainer").style.display = "block"
                }, 100)

                setTimeout(() => {
                    document.getElementById("containerImg").style.transition = "0s"
                }, 200)


                if (document.getElementById("loginContainer") !== null) {
                    setTimeout(() => {
                        document.getElementById("loginContainer").style.top = "100vh"

                    }, 200)
                }

                if (document.getElementById("registerContainer") !== null) {
                    setTimeout(() => {
                        document.getElementById("loginContainer").style.display = "none"
                        document.getElementById("registerContainer").style.top = "0vh"
                        document.getElementById("registerUserPreview").style.top = "0vh"
                    }, 400)
                }

                setDisplayLogin(false)
            }
        }, [displayRegister]
    )

    return <>

        <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap" rel="stylesheet"></link>
        <section className="welcome">
            <div id="loginContainer">
                <Login
                    setDisplayRegister={setDisplayRegister} />
            </div>

            <div id="registerContainer">
                <Register />
            </div>
            <div className="flex">

                <div className="title">
                    <h1 id="whatchaDrinking"><span id="whatcha">WHATCHA</span> <span id="drinking">DRINKING</span></h1>
                    <section className="welcome-bttns">
                        <button
                            id="loginBttn"
                            className="welcomeBttn"
                            onClick={
                                () => {
                                    setDisplayLogin(true)

                                }
                            }>Login</button>
                        <button
                            id="registerBttn"
                            className="welcomeBttn"
                            onClick={
                                () => {
                                    setDisplayRegister(true)
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