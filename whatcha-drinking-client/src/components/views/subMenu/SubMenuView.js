import { useEffect, useState } from "react"
import { getCurrentUser } from "../../utils/Constants"
import "../drinks/Drinks.css"
import { RecentDrink } from "../drinks/RecentDrink"
import { DrinkFilter } from "../drinks/DrinkFilter"
import "./SubMenu.css"
import { DrinkFilterContainer } from "../drinks/DrinkFilterContainer"
import { DrinkSearchBar } from "../drinks/DrinkSearchBar"

export const SubMenuView = ({
    drinkingNow,
    filter,
    setFilter,
    setFilterVariable,
    filterVariable,
    setShowAll,
    showAll,
    setSearchValue,
    location,
    setEditUser,
    setFilterByPreference,
    filterByPreference }) => {


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

    //display drink types

    const url2 = "https://localhost:7189/api/DrinkType/drink_types"

    const displayDrinkTypes = async () => {
        const fetchData = await fetch(`${url2}`)
        const fetchJson = await fetchData.json()
        setDrinkTypes(fetchJson)
    }
    const [drinkTypes, setDrinkTypes] = useState([])
    const [filteredDrinkTypes, setFilteredDrinkTypes] = useState([])

    useEffect(
        () => {
            displayDrinkTypes()
        }, []
    )

    useEffect(
        () => {
            let copy = drinkTypes.map(x => ({ ...x }))

            copy = copy.filter(
                x => !preferences
                    .find(y => y.type === x.type && y.preferenceTypeId === 2)
            )

            copy = copy.sort((a, b) => a.type.localeCompare(b.type))

            setFilteredDrinkTypes(copy)

        }, [drinkTypes]
    )

    //get most recent drink

    const firebaseId = getCurrentUser().uid

    const url = `https://localhost:7189/api/Drink/most_recent?userId=${firebaseId}`

    const displayRecentDrink = async () => {
        const fetchData = await fetch(`${url}`)
        const fetchJson = await fetchData.json()
        setRecentDrink(fetchJson)
    }

    const [recentDrink, setRecentDrink] = useState({})

    useEffect(
        () => {
            displayRecentDrink()
        }, [, drinkingNow]
    )

    // all button color

    useEffect(
        () => {
            if (location !== "userProfile") {
                showAll
                    ? document.getElementById(`optionAll`).classList.add("drink-filter-option-all-selected")
                    : document.getElementById(`optionAll`).classList.remove("drink-filter-option-all-selected")
            }

        }, [showAll]
    )

    return (
        <section className="sub-menu-view">

            <section className="drink-recent-activities">



                <RecentDrink
                    id={recentDrink.id}
                    name={recentDrink.name}
                    type={recentDrink.type}
                    timesTried={recentDrink.timesTried}
                    dateTime={recentDrink.dateTime}
                    image={recentDrink.image}
                    drinkingNow={drinkingNow}
                />

                {location === "userProfile"
                    ?
                    <section>
                        <div
                            className="userprofile-bttn"
                            onClick={
                                () => {
                                    setEditUser(true)
                                }
                            }
                        >Edit Profile</div>
                    </section>
                    : <></>}

                {location === "userProfile"
                    ? <></>
                    : <section className="drink-filter-container">
                        <DrinkFilterContainer
                            drinkTypes={filteredDrinkTypes}
                            setFilter={setFilter}
                            filter={filter}
                            setFilterVariable={setFilterVariable}
                            filterVariable={filterVariable}
                            setShowAll={setShowAll}
                            showAll={showAll}
                            setFilterByPreference={setFilterByPreference}
                            filterByPreference={filterByPreference} />
                    </section>}
                {location === "userProfile"
                    ? <></>
                    :
                    <section
                        className="drink-searchbar">
                        <DrinkSearchBar
                            setSearchValue={setSearchValue} />
                    </section>}

            </section>

        </section>
    )
}