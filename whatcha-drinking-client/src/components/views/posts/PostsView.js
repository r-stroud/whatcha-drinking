import { DrinkImgs, getCurrentUser } from "../../utils/Constants"
import { useEffect, useState } from "react"
import { SubMenuView } from "../subMenu/SubMenuView"
import { Posts } from "./Posts"
import { useNavigate } from "react-router-dom"
import { PostsUserPreview } from "./PostsUserPreview"

export const PostsView = () => {

    //current user

    const currentUser = getCurrentUser()

    //match drink image src
    let imageSrc = DrinkImgs[Math.floor(Math.random() * DrinkImgs.length)]

    const navigate = useNavigate()

    const currentLocation = "postView"

    //get posts

    const url = "https://localhost:7189/api/Post/get_posts"

    const url2 = `https://localhost:7189/api/Drink/drink_preferences?userId=${currentUser.uid}`

    const displayPosts = async () => {


        const fetchData2 = await fetch(`${url2}`)
        const fetchJson2 = await fetchData2.json()
        setPreferences(fetchJson2)

        const fetchData = await fetch(`${url}`)
        const fetchJson = await fetchData.json()
        setPosts(fetchJson)

    }

    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(
        () => {

            displayPosts()

        }, [refresh]
    )

    //display preferences

    const [preferences, setPreferences] = useState([])

    const [filterByPreference, setFilterByPreference] = useState(false)

    // display all posts related to drinks by default / filter selection

    const [showAll, setShowAll] = useState(true)

    //filtered drinks

    const [filter, setFilter] = useState(false) // checks if filter bttn is clicked
    const [filterVariable, setFilterVariable] = useState("empty") // name of filter bttn clicked
    const [filterArray, setFilterArray] = useState([]) // array of selected filter bttns
    const [filterDrinksOn, setFilteredDrinksOn] = useState(false) // filters drinks
    const [filteredPosts, setFilteredPosts] = useState([]) // array of filtered drinks

    useEffect(
        () => {
            let copyArray = filterArray
            if (copyArray.includes("empty")) {
                let index = copyArray.indexOf("empty")
                index !== -1 ? copyArray.splice(index, 1)
                    : <></>
            }

            if (copyArray.includes(filterVariable)) {
                let index = copyArray.indexOf(filterVariable)
                index !== -1 ? copyArray.splice(index, 1)
                    : <></>
            } else {
                copyArray.push(filterVariable)
            }
            showAll === true || filterByPreference === true ? setFilterArray([]) : setFilterArray(copyArray)
            setFilteredDrinksOn(!filterDrinksOn)
        }, [filter, showAll, filterByPreference]
    )

    useEffect(
        () => {

            let copy = posts.map(x => ({ ...x }))

            copy = copy.filter(
                x => !preferences
                    .find(y => y.type === x.drinkType && y.preferenceTypeId === 2)
            )

            console.log(copy)

            if (showAll === true) {

                setFilteredPosts(copy)

            } else if (filterByPreference === true) {
                const filterCopy = copy.filter(x => preferences
                    .find(y => y.type === x.drinkType && y.preferenceTypeId === 1))
                setFilteredPosts(filterCopy)
            }

            else {

                const newArray = []

                filterArray.map(fa => {
                    copy.filter(c => c.drinkType
                        .toUpperCase() === fa.toUpperCase()).forEach(e => newArray.push(e))

                })

                setFilteredPosts(newArray)

            }

        }, [filterDrinksOn, showAll, posts, filterByPreference]
    )

    // searched drinks

    const [searchValue, setSearchValue] = useState("")
    const [searchReults, setSearchResults] = useState([])

    useEffect(
        () => {
            const copy = filteredPosts.map(x => ({ ...x }))
            const searchResults = copy.filter(x =>
                x.drinkName.toUpperCase().includes(searchValue.toUpperCase())
                || x.message.toUpperCase().includes(searchValue.toUpperCase())
                || x.username.toUpperCase().includes(searchValue.toUpperCase())
                || x.userFirstName.toUpperCase().includes(searchValue.toUpperCase())
                || x.userLastName.toUpperCase().includes(searchValue.toUpperCase())
            )

            setSearchResults(searchResults)
        }, [searchValue, filteredPosts]
    )

    //set user preview

    const [userPreview, setUserPreview] = useState(false)

    const [userPreviewId, setUserPreivewId] = useState(0)

    return (
        <>
            <section
                style={{
                    backgroundColor: "rgb(160, 135, 74)",
                    minHeight: "100vh"
                }}>
                <SubMenuView
                    location={currentLocation}
                    setFilter={setFilter}
                    filter={filter}
                    setFilterVariable={setFilterVariable}
                    filterVariable={filterVariable}
                    setShowAll={setShowAll}
                    showAll={showAll}
                    setFilterByPreference={setFilterByPreference}
                    filterByPreference={filterByPreference}
                    setSearchValue={setSearchValue} />
                <section
                    className="post-container">

                    {searchReults.length < 1
                        ? <>
                            <section
                                className="post"
                                onClick={
                                    () => {
                                        navigate("/drinks")
                                    }
                                }>

                                <section
                                    className="post-drink-img">

                                    <img
                                        src={imageSrc.src} />

                                </section>

                                <section
                                    className="post-header">
                                    No Results Found
                                </section>
                                <section
                                    className="post-drink-info">
                                    Be The First!

                                </section>
                                <section
                                    className="post-message post-message-default">
                                    <div>Be the first to create a post!</div>
                                    <div>Check out our drink selection to try something and then post about it!</div>

                                </section>

                            </section>
                        </>
                        : <>
                            {searchReults.map(x =>
                                <>

                                    <Posts
                                        key={x.id}
                                        id={x.id}
                                        userId={x.userId}
                                        username={x.username}
                                        userFirstName={x.userFirstName}
                                        userLastName={x.userLastName}
                                        userPic={x.userPic}
                                        drinkId={x.drinkId}
                                        drinkName={x.drinkName}
                                        drinkPic={x.drinkPic}
                                        drinkType={x.drinkType}
                                        dateTime={x.dateTime}
                                        picture={x.picture}
                                        message={x.message}
                                        setRefresh={setRefresh}
                                        refresh={refresh}
                                        setUserPreview={setUserPreview}
                                        userPreview={userPreview}
                                        setUserPreivewId={setUserPreivewId} />

                                    {x.userId === currentUser.uid || userPreview === false
                                        ? <></>
                                        : <PostsUserPreview
                                            setUserPreview={setUserPreview}
                                            userPreview={userPreview}
                                            userId={userPreviewId} />}

                                </>
                            )}</>}
                </section>

            </section>
        </>
    )
}