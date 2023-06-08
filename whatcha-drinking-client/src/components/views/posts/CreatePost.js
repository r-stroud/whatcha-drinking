import { useState, useEffect } from "react"
import { getCurrentUser } from "../../utils/Constants"
import { CreatePostSearchResult } from "./CreatePostSearchResult"
import "./Posts.css"

export const CreatePost = () => {

    // display drinks
    const url2 = "https://localhost:7189/api/Drink/drinks"

    const displayDrinks = async () => {
        const fetchData = await fetch(`${url2}`)
        const fetchJson = await fetchData.json()
        setDrinks(fetchJson)
    }

    const [drinks, setDrinks] = useState([])
    const [updateDom, setUpdateDom] = useState(false)

    useEffect(
        () => {
            displayDrinks()
        }, [, updateDom]
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

        }, [drinks]
    )

    // search results

    const [results, setResults] = useState([])
    const [searchValue, setSearchValue] = useState("")


    useEffect(
        () => {
            const copy = filterDrinks.map(x => ({ ...x }))
            let searchResults = copy.filter(x =>
                x.name.toUpperCase().includes(searchValue.toUpperCase())
                || x.type.toUpperCase().includes(searchValue.toUpperCase()
                ))
            let slicedArray = searchResults
                .sort((a, b) => a.name.localeCompare(b.name))
                .slice(0, 10)

            setResults(slicedArray)
        }, [searchValue]
    )

    //set background
    const [background, setBackground] = useState("")


    return (

        <form
            className="create-post-form">

            <section
                className="create-post-title">
                <div
                    className="create-post-header">
                    Create a New Post
                </div>
            </section>

            <section
                className="create-post-drink"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundPosition: "right top",
                    backgroundSize: "550px 700px",
                    backgroundRepeat: "no-repeat"
                }}>

                <fieldset>
                    <div
                        className="create-post-number">1</div>
                    <label>Drink<span>optional</span></label>
                    <input
                        type="text"
                        className="create-post-searchbar"
                        value={searchValue}
                        onChange={
                            (e) => {
                                setSearchValue(e.target.value)
                            }
                        }
                    />

                    <div
                        className="create-post-form-drink-results">
                        {results.map((x, i) =>
                            <>
                                <CreatePostSearchResult
                                    type={x.type}
                                    name={x.name}
                                    image={x.image}
                                    setBackground={setBackground}
                                    index={i}
                                    setSearchValue={setSearchValue} />
                            </>)}

                    </div>

                </fieldset>
            </section>
        </form>
    )
}