import { useState, useEffect } from "react"
import { getCurrentUser } from "../../../utils/Constants"
import { useNavigate } from "react-router-dom"
import "../Posts.css"
import { DrinkSection } from "./DrinkSection"
import { MessageSection } from "./MessageSection"
import { ImageSection } from "./ImageSection"
import { fetchDrinks, fetchPreferences, createPost } from "../../../api/Api"

export const CreatePost = ({
    searchValue,
    setSearchValue,
    paramName }) => {

    const navigate = useNavigate()


    //display preferences and drinks

    const currentUser = getCurrentUser()

    const fetchDrinksAndPreferences = async () => {
        let preferences = await fetchPreferences(currentUser)
        let drinks = await fetchDrinks()
        await setPreferences(preferences)
        await setDrinks(drinks)
    }

    const [drinks, setDrinks] = useState([])
    const [preferences, setPreferences] = useState([])

    useEffect(
        () => {

            fetchDrinksAndPreferences()

        }, []
    )

    // filter drinks by preferences

    const [filterDrinks, setFilterDrinks] = useState([])

    useEffect(
        () => {

            let copy = drinks.map(x => ({ ...x }))

            copy = copy.filter(
                x => !preferences
                    .find(y => y.type === x.type && y.preferenceTypeId === 2)
            )

            setFilterDrinks(copy)

        }, [drinks]
    )

    useEffect(
        () => {
            setSearchValue(paramName)
        }, []
    )

    // search results

    const [results, setResults] = useState([])

    useEffect(
        () => {
            const filterDrinksCopy = filterDrinks.map(x => ({ ...x }))
            let searchResults = filterDrinksCopy.filter(x =>
                x.name.toUpperCase().includes(searchValue.toUpperCase())
                || x.type.toUpperCase().includes(searchValue.toUpperCase()
                ))
            let slicedSearchResults = searchResults
                .sort((a, b) => a.name.localeCompare(b.name))
                .slice(0, 10)

            setResults(slicedSearchResults)
        }, [filterDrinks, searchValue]
    )

    //post to be added

    const [drinkSelected, setDrinkSelected] = useState(false)

    const [drinkValue, setDrinkValue] = useState({})

    const [post, setPost] = useState({
        drinkId: "",
        message: ""
    })

    // display functions

    function hideImageSection() {
        // document.getElementById("createPostImage")
        //     .style.left = "100vw"
        // document.getElementById("createPostImage")
        //     .style.width = "0%"
        // sectionConfirmed > 2 ? document.getElementById(`createPostTitleImage`)
        //     .style.left = "0vw" : <></>
    }

    function hideMessageSection() {
        document.getElementById("createPostMessage")
            .style.left = "100vw"
        document.getElementById("createPostMessage")
            .style.width = "0%"
        sectionConfirmed > 1 ? document.getElementById(`createPostTitleMessage`)
            .style.left = "0vw" : <></>
    }

    function hideDrinkSection() {
        document.getElementById("createPostDrink")
            .style.right = "50vw"
        document.getElementById("createPostDrink")
            .style.width = "0vw"
        document.getElementById(`createPostTitleDrink`)
            .style.left = "0vw"
    }

    const [sectionConfirmed, setSectionConfirmed] = useState(0)

    // create post

    const addPost = async () => {
        await createPost(currentUser, post)
        await navigate("/")
    }

    return (

        <form
            className="create-post-form">

            <section
                className="create-post-title">

                <div
                    className="create-post-header">
                    Create a New Post
                </div>

                <section
                    id="createPostTitleDrink"
                    className="create-post-title-drink">
                    <div
                        className="create-post-title-section-number">
                        1
                    </div>
                    <div
                        className="create-post-clickable-title"
                        onClick={
                            () => {
                                // setSectionConfirmed(2)

                                document.getElementById(`createPostTitleDrink`)
                                    .style.left = "30vw"

                                hideImageSection()

                                hideMessageSection()

                                setTimeout(
                                    () => {
                                        document.getElementById("createPostDrink")
                                            .style.right = "0vw"
                                        document.getElementById("createPostDrink")
                                            .style.width = "100%"
                                    }, 170
                                )
                            }
                        }>
                        Drink <span>optional</span>
                    </div>
                </section>

                <section
                    id="createPostTitleMessage"
                    className="create-post-title-drink">
                    <div
                        className="create-post-title-section-number"
                    >
                        2
                    </div>
                    <div
                        className="create-post-clickable-title"
                        onClick={
                            () => {
                                // setSectionConfirmed(2)

                                document.getElementById(`createPostTitleMessage`)
                                    .style.left = "30vw"

                                hideImageSection()

                                hideDrinkSection()

                                setTimeout(
                                    () => {
                                        document.getElementById("createPostMessage")
                                            .style.left = "0vw"
                                        document.getElementById("createPostMessage")
                                            .style.width = "100%"
                                    }, 170
                                )
                            }
                        }>
                        Message
                    </div>
                </section>

                {/* <section
                    id="createPostTitleImage"
                    className="create-post-title-drink">
                    <div
                        className="create-post-title-section-number">
                        3
                    </div>
                    <div
                        className="create-post-clickable-title"
                        onClick={
                            () => {
                                // setSectionConfirmed(2)

                                document.getElementById(`createPostTitleImage`)
                                    .style.left = "30vw"

                                hideMessageSection()

                                hideDrinkSection()

                                setTimeout(
                                    () => {
                                        document.getElementById("createPostImage")
                                            .style.left = "0vw"
                                        document.getElementById("createPostImage")
                                            .style.width = "100%"
                                    }, 170
                                )
                            }
                        }>
                        Image
                    </div>
                </section> */}
                <section
                    className="create-post-title-bttns">
                    {sectionConfirmed > 1
                        ? <div
                            onClick={
                                () => {
                                    addPost()
                                }
                            }
                            className="create-post-title-confirm">
                            Confirm</div>
                        : <></>}

                    <div
                        className="create-post-title-cancel"
                        onClick={() => {
                            navigate("/")
                        }}
                    >
                        Cancel
                    </div>
                </section>
            </section>

            <section
                id="createPostDrink"
                className="create-post-drink">

                <DrinkSection
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    results={results}
                    setDrinkSelected={setDrinkSelected}
                    drinkSelected={drinkSelected}
                    setDrinkValue={setDrinkValue}
                    drinkValue={drinkValue}
                    setPost={setPost}
                    post={post}
                    sectionConfirmed={sectionConfirmed}
                    setSectionConfirmed={setSectionConfirmed} />

            </section>
            <section
                id="createPostMessage"
                className="create-post-message">
                <MessageSection
                    setPost={setPost}
                    post={post}
                    sectionConfirmed={sectionConfirmed}
                    setSectionConfirmed={setSectionConfirmed} />

            </section>

            <section
                id="createPostImage"
                className="create-post-image">
                <ImageSection
                    setPost={setPost}
                    post={post}
                    sectionConfirmed={sectionConfirmed}
                    setSectionConfirmed={setSectionConfirmed} />

            </section>
        </form>
    )
}