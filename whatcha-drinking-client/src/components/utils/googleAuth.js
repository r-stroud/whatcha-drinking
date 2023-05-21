import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";

// SignIn brings up the google sign in pop up AND works
// for both signing in AND registering a user

const url = "https://localhost:7189/api/User/new-user?firebaseId=";

export const googleAuth = {
    // Works to sign in AND register a user
    signInRegister: function (navigate) {
        return new Promise((res) => {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then((userCredential) => {
                    const userAuth = {
                        email: userCredential.user.email,
                        displayName: userCredential.user.displayName,
                        uid: userCredential.user.uid,
                        type: "google",
                    };
                    // Add user object to localStorage
                    localStorage.setItem("wd_user", JSON.stringify(userAuth));

                    (fetch(`${url}${userCredential.user.uid}`, {
                        method: "POST",
                        body: JSON.stringify(userCredential.user.uid),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }))
                    // Navigate us back home
                    navigate("/");

                    console.log("you did it");
                })
                .catch((error) => {
                    console.log("Google Sign In Error");
                    console.log("error code", error.code);
                    console.log("error message", error.message);
                    console.log("error email", error.email);
                });
        });
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