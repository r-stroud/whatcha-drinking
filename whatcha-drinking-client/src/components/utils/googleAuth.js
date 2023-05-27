import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";

// SignIn brings up the google sign in pop up AND works
// for both signing in AND registering a user

const url = "https://localhost:7189/api/User/new-user?firebaseId=";

const url2 = "https://localhost:7189/api/User/GetExistingFirebaseId";

export const googleAuth = {





    // Works to sign in AND register a user
    signInRegister: function (navigate, userObj = null, loginOrRegister) {
        // userObj === null ? navigate("/register") : <>
        // </>

        // fetch all created firebaseID

        let firebaseId = []

        const collectFirebaseId = async () => {
            const fetchData = await fetch(url2)
            const fetchJson = await fetchData.json()
            firebaseId = fetchJson
        }

        collectFirebaseId()



        return new Promise((res) => {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();

            // if (userObj === null) {

            //     window.scrollTo(0, 0)

            //     setTimeout(() => {
            //         document.getElementById("containerImg").style.right = "50vw"
            //         document.getElementById("registerContainer").style.display = "block"
            //     }, 100)

            //     if (document.getElementById("loginContainer") !== null) {
            //         setTimeout(() => {
            //             document.getElementById("loginContainer").style.top = "100vh"
            //             document.getElementById("loginContainer").style.display = "none"
            //         }, 200)
            //     }

            //     if (document.getElementById("registerContainer") !== null) {
            //         setTimeout(() => {
            //             document.getElementById("registerContainer").style.top = "0vh"
            //         }, 200)
            //     }


            // navigate("/register")
            // } else {
            signInWithPopup(auth, provider)
                .then((userCredential) => {
                    const userAuth = {
                        email: userCredential.user.email,
                        displayName: userCredential.user.displayName,
                        uid: userCredential.user.uid,
                        type: "google",
                    };

                    if (!firebaseId.includes(userCredential.user.uid) && loginOrRegister === "login") {
                        window.scrollTo(0, 0)

                        setTimeout(() => {
                            document.getElementById("containerImg").style.right = "50vw"
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
                                document.getElementById("registerUserPreview").style.top = "0vh"
                            }, 200)
                        }

                    } else if (!firebaseId.includes(userCredential.user.uid) && loginOrRegister === "register") {

                        localStorage.setItem("wd_user", JSON.stringify(userAuth));

                        (fetch(`${url}`, {
                            method: "POST",
                            body: JSON.stringify({
                                firebaseId: userCredential.user.uid,
                                firstName: userObj.firstName,
                                lastName: userObj.lastName,
                                username: userObj.username,
                                email: userCredential.user.email,
                                profilePic: userObj.profilePic
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }))

                        navigate("/");
                    } else {

                        // Add user object to localStorage
                        localStorage.setItem("wd_user", JSON.stringify(userAuth));

                        // (fetch(`${url}`, {
                        //     method: "POST",
                        //     body: JSON.stringify({
                        //         firebaseId: userCredential.user.uid,
                        //         firstName: userObj.firstName,
                        //         lastName: userObj.lastName,
                        //         username: userObj.username,
                        //         email: userCredential.user.email,
                        //         profilePic: userObj.profilePic
                        //     }),
                        //     headers: {
                        //         "Content-Type": "application/json"
                        //     }
                        // }))

                        // Navigate us back home
                        navigate("/");

                        console.log("you did it")
                    };
                })
                .catch((error) => {
                    console.log("Google Sign In Error");
                    console.log("error code", error.code);
                    console.log("error message", error.message);
                    console.log("error email", error.email);
                });
        }
            // }
        );
    },
    // Sign out a user
    signOut: function (navigate) {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Remove user from localStorage
                localStorage.removeItem("wd_user");
                // Navigate us back home
                navigate("/");
                console.log("Sign Out Success!");
            })
            .catch((error) => {
                console.log("Google SignOut Error");
                console.log("error code", error.code);
                console.log("error message", error.message);
            });
    },
};