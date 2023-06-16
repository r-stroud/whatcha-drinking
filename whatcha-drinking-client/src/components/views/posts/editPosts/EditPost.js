import { useState, useEffect } from "react"
import { getCurrentUser } from "../../../utils/Constants"
import { useNavigate } from "react-router-dom"
import "../Posts.css"
import { DrinkSection } from "../createPosts/DrinkSection"
import { MessageSection } from "../createPosts/MessageSection"
import { ImageSection } from "../createPosts/ImageSection"
import { useParams } from "react-router-dom"


export const EditPost = ({
    setCreatePost,
    searchValue,
    setSearchValue }) => {

    const navigate = useNavigate()

    const paramId = useParams().id

    // update item

    const [editPostInfo, setEditPostInfo] = useState([])

    console.log(editPostInfo)

    // display drinks
    const url2 = "https://localhost:7189/api/Drink/drinks"

    const displayDrinks = async (id) => {

        const fetchData = await fetch(`https://localhost:7189/api/Post/get_post_by_id?id=${id}`)
        const fetchJson = await fetchData.json()
        setEditPostInfo(fetchJson)

        const fetchData2 = await fetch(`${url2}`)
        const fetchJson2 = await fetchData2.json()
        setDrinks(fetchJson2)
    }

    const [drinks, setDrinks] = useState([])
    // const [updateDom, setUpdateDom] = useState(false)

    useEffect(
        () => {
            displayDrinks(paramId)
        }, []
    )

    //display preferences

    const currentUser = getCurrentUser()

    const url3 = `https://localhost:7189/api/Drink/drink_preferences?userId=${currentUser.uid}`

    const displayDrinkPreferences = async () => {
        const fetchData = await fetch(`${url3}`)
        const fetchJson = await fetchData.json()
        setPreferences(fetchJson)
    }

    const [preferences, setPreferences] = useState([])


    useEffect(
        () => {
            displayDrinkPreferences()

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

            setSearchValue(editPostInfo.drinkName)

        }, [drinks]
    )


    // search results

    const [results, setResults] = useState([])

    useEffect(
        () => {
            const copy = filterDrinks.map(x => ({ ...x }))
            let searchResults = copy.filter(x =>
                x.name.toUpperCase().includes(searchValue.toUpperCase())
                || x.type.toUpperCase().includes(searchValue.toUpperCase()
                ))
            let slicedArray = searchResults
                .sort((a, b) => a.name.localeCompare(b.name))
                .slice(0, 5)

            setResults(slicedArray)
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
        document.getElementById("createPostImage")
            .style.left = "100vw"
        document.getElementById("createPostImage")
            .style.width = "0%"
        sectionConfirmed > 2 ? document.getElementById(`createPostTitleImage`)
            .style.left = "0vw" : <></>
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

    // update post

    const url = "https://localhost:7189/api/Post/update_post"

    const updatePost = async () => {

        await fetch(`${url}`, {
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

        await navigate("/")
    }

    return (

        <form
            className="create-post-form">

            <section
                className="create-post-title">

                <div
                    className="create-post-header">
                    Edit Post
                </div>

                <section
                    id="createPostTitleDrink"
                    className="create-post-title-drink">
                    <div
                        className="create-post-title-section-number">
                        1
                    </div>
                    <div
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

                <section
                    id="createPostTitleImage"
                    className="create-post-title-drink">
                    <div
                        className="create-post-title-section-number">
                        3
                    </div>
                    <div
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
                </section>
                <section
                    className="create-post-title-bttns">
                    {sectionConfirmed > 2
                        ? <div
                            onClick={
                                () => {
                                    updatePost()
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
                    setSectionConfirmed={setSectionConfirmed}
                    editPostInfo={editPostInfo}
                    drinks={drinks} />

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