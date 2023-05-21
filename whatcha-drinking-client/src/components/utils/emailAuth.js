import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";

// userObject expected ---->
// {
//   email: "",
//   password: "",
//   fullName: "",
// }

const url = "https://localhost:7189/api/User/new-user?firebaseId=";

export const emailAuth = {
    // Register New User
    register: function (userObj, navigate) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
            .then((userCredential) => {
                const auth = getAuth();
                updateProfile(auth.currentUser, {
                    displayName: userObj.fullName,
                }).then(
                    function () {
                        const userAuth = {
                            email: userCredential.user.email,
                            displayName: userObj.fullName,
                            uid: userCredential.user.uid,
                            type: "email",
                        };
                        // Saves the user to localstorage
                        localStorage.setItem("wd_user", JSON.stringify(userAuth));



                        // Navigate us back to home
                        navigate("/");
                    },
                    function (error) {
                        console.log("Email Register Name Error");
                        console.log("error code", error.code);
                        console.log("error message", error.message);
                    }
                )
                    .then(fetch(`${url}`, {
                        method: "POST",
                        body: JSON.stringify({
                            firebaseId: userCredential.user.uid,
                            firstName: userObj.firstName,
                            lastName: userObj.lastName,
                            username: userObj.username
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }));
            })
            .catch((error) => {
                console.log("Email Register Error");
                console.log("error code", error.code);
                console.log("error message", error.message);
            });
    },
    // Sign in existing user
    signIn: function (userObj, navigate) {
        return new Promise((res) => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, userObj.email, userObj.password)
                .then((userCredential) => {
                    const userAuth = {
                        email: userCredential.user.email,
                        displayName: userCredential.user.displayName,
                        uid: userCredential.user.uid,
                        type: "email",
                    };
                    // Saves the user to localstorage
                    localStorage.setItem("wd_user", JSON.stringify(userAuth));
                    // Navigate us back to home
                    navigate("/");
                })
                .catch((error) => {
                    console.log("Email SignIn Error");
                    console.log("error code", error.code);
                    console.log("error message", error.message);
                });
        });
    },
    // Sign out
    signOut: function (navigate) {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Remove the user from localstorage
                localStorage.removeItem("wd_user");
                // Navigate us back to home
                navigate("/");
                console.log("Sign Out Success!");
            })
            .catch((error) => {
                console.log("signOut Error");
                console.log("error code", error.code);
                console.log("error message", error.message);
            });
    },
};