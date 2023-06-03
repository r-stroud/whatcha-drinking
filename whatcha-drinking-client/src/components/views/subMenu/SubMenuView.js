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
    setEditUser }) => {

    //display drink types

    const url2 = "https://localhost:7189/api/DrinkType/drink_types"

    const displayDrinkTypes = async () => {
        const fetchData = await fetch(`${url2}`)
        const fetchJson = await fetchData.json()
        setDrinkTypes(fetchJson)
    }
    const [drinkTypes, setDrinkTypes] = useState([])

    useEffect(
        () => {
            displayDrinkTypes()
        }, []
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

                <RecentDrink
                    id={recentDrink.id}
                    name={recentDrink.name}
                    type={recentDrink.type}
                    timesTried={recentDrink.timesTried}
                    dateTime={recentDrink.dateTime}
                />

                {location === "userProfile"
                    ? <></>
                    : <section>
                        <DrinkFilterContainer
                            drinkTypes={drinkTypes}
                            setFilter={setFilter}
                            filter={filter}
                            setFilterVariable={setFilterVariable}
                            filterVariable={filterVariable}
                            setShowAll={setShowAll}
                            showAll={showAll} />
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