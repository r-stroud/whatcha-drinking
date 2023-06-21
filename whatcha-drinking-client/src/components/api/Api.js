// add drink to userDrinks
export const updateDrink = async (firebaseId, id) => {

    const addDrinkURL = `https://localhost:7189/api/Drink/add_drink`

    await fetch(`${addDrinkURL}`, {
        method: "POST",
        body: JSON.stringify({
            userId: firebaseId,
            drinkId: id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

}

// fetch number of times drank
export const fetchTimesTried = async (firebaseId, drinkId) => {

    const timesTriedURL = `https://localhost:7189/api/Drink/times_tried?userId=${firebaseId}&drinkId=${drinkId}`

    const fetchData = await fetch(`${timesTriedURL}`)
    const fetchJson = await fetchData.json()

    return (fetchJson)
}

// fetch drinks
export const fetchDrinks = async () => {

    const drinkURL = "https://localhost:7189/api/Drink/drinks"
    const fetchDrinks = await fetch(drinkURL)
    const drinkJson = await fetchDrinks.json()
    return (drinkJson)
}

// fetch preferences
export const fetchPreferences = async (currentUser) => {
    const preferenceURL = `https://localhost:7189/api/Drink/drink_preferences?userId=${currentUser.uid}`
    const fetchPreferences = await fetch(`${preferenceURL}`)
    const preferenceJson = await fetchPreferences.json()
    return preferenceJson
}

// create a post
export const createPost = async (currentUser, post) => {

    const createPostURL = "https://localhost:7189/api/Post/create_post"

    await fetch(`${createPostURL}`, {
        method: "POST",
        body: JSON.stringify({
            userId: currentUser.uid,
            drinkId: post.drinkId,
            message: post.message
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// get post by id
export const fetchPostById = async (postId) => {
    const fetchPost = await fetch(`https://localhost:7189/api/Post/get_post_by_id?id=${postId}`)
    const postJson = await fetchPost.json()
    return postJson
}

// update a post
export const updatePost = async (paramId, currentUser, post) => {

    const updatePostURL = "https://localhost:7189/api/Post/update_post"

    await fetch(`${updatePostURL}`, {
        method: "PUT",
        body: JSON.stringify({
            id: paramId,
            userId: currentUser.uid,
            drinkId: post.drinkId,
            message: post.message
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// delete a post
export const deletePost = async (postId) => {
    const fetchData = await fetch(`https://localhost:7189/api/Post/remove_post/${postId}`,
        { method: "DELETE" })
}

// fetch recent drink
export const fetchRecentDrink = async (userId) => {

    const recentDrinkURL = `https://localhost:7189/api/Drink/most_recent?userId=${userId}`

    const fetchRecentDrink = await fetch(`${recentDrinkURL}`)
    const recentDrinkJson = await fetchRecentDrink.json()
    return recentDrinkJson
}

// fetch user details
export const fetchUserDetails = async (userId) => {

    const userDetailsURL = `https://localhost:7189/api/User/GetByFirebaseId?firebaseId=${userId}`

    const fetchUserDetails = await fetch(`${userDetailsURL}`)
    const userDetailsJson = await fetchUserDetails.json()
    return userDetailsJson
}

// fetch userFriends
export const fetchUserFriends = async (currentUser) => {
    const userFriendsURL = `https://localhost:7189/api/User/friends?userId=${currentUser.uid}`

    const fetchUserFriends = await fetch(userFriendsURL)
    const userFriendsJson = await fetchUserFriends.json()
    return userFriendsJson
}

//add a friend
export const addFriendRequest = async (currentUser, userId) => {
    const addFriendURL = 'https://localhost:7189/api/User/add_friend'

    await fetch(`${addFriendURL}`, {
        method: "POST",
        body: JSON.stringify({
            userId: currentUser.uid,
            friendId: userId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// fetch posts
export const fetchPosts = async () => {
    const fetchPostsURL = "https://localhost:7189/api/Post/get_posts"

    const fetchPosts = await fetch(`${fetchPostsURL}`)
    const postsJson = await fetchPosts.json()
    return postsJson
}

// fetch drinkTypes
export const fetchDrinkTypes = async () => {
    const drinkTypeURL = "https://localhost:7189/api/DrinkType/drink_types"

    const fetchDrinkTypes = await fetch(`${drinkTypeURL}`)
    const drinkTypesJson = await fetchDrinkTypes.json()
    return drinkTypesJson
}

// fetch most tried drink
export const fetchMostTried = async (userId) => {
    const mostTriedURL = `https://localhost:7189/api/Drink/most_tried?userId=${userId}`

    const fetchMostTried = await fetch(`${mostTriedURL}`)
    const mostTriedJson = await fetchMostTried.json()
    return mostTriedJson
}

// get user drinks
export const fetchUserDrinks = async (userId) => {
    const userDrinksURL = `https://localhost:7189/api/Drink/user_drinks?userId=${userId}`

    const fetchUserDrinks = await fetch(`${userDrinksURL}`)
    const userDrinksJson = await fetchUserDrinks.json()
    return userDrinksJson
}

//add preference
export const addPreferenceRequest = async (currentUser, id, number) => {
    const addPreferenceRequestURL = "https://localhost:7189/api/Drink/drink_preference"

    await fetch(`${addPreferenceRequestURL}`, {
        method: "PUT",
        body: JSON.stringify({
            userId: currentUser.uid,
            drinkTypeId: id,
            preferenceTypeId: number
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

//get username by entry
export const fetchUsername = async (searchValue) => {
    const usernameURL = 'https://localhost:7189/api/User/GetByUsername?username=';

    const fetchUsername = await fetch(`${usernameURL}${searchValue}`)
    const usernameJson = await fetchUsername.json()
    return usernameJson
}

//update user
export const updateUserFetchCall = async (currentUser, user) => {
    const updateUserURL = "https://localhost:7189/api/User/update_user"

    await fetch(`${updateUserURL}`, {
        method: "PUT",
        body: JSON.stringify({
            firebaseId: currentUser.uid,
            email: "",
            address: "",
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            profilePic: user.profilePic
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

// fetch friend requests
export const fetchRequests = async (currentUser) => {

    const requestsURL = `https://localhost:7189/api/User/friend_requests?userId=${currentUser.uid}`

    const fetchFriendRequests = await fetch(`${requestsURL}`)
    const friendRequestsJson = await fetchFriendRequests.json()
    return friendRequestsJson

}

//approve friend request
export const approveFriendRequest = async (currentUser, friendFirebaseId) => {

    const approveFriendURL = "https://localhost:7189/api/User/update_friendship"

    await fetch(`${approveFriendURL}`, {
        method: "PUT",
        body: JSON.stringify({
            id: 0,
            userId: currentUser.uid,
            friendId: friendFirebaseId,
            isApproved: true
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

//fetch current friends
export const fetchFriends = async (currentUser) => {
    const friendURL = `https://localhost:7189/api/User/friends?userId=${currentUser.uid}`

    const fetchFriends = await fetch(`${friendURL}`)
    const friendsJson = await fetchFriends.json()
    return friendsJson
}




