import { useEffect, useState } from "react"
import { getCurrentUser } from "../../utils/Constants"
import "./Drinks.css"
import { RecentDrink } from "./RecentDrink"
import { DrinkFilter } from "./DrinkFilter"

export const DrinkRecentActivities = ({
    drinkingNow,
    filter,
    setFilter,
    setFilterVariable,
    filterVariable,
    setShowAll,
    showAll }) => {

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
            showAll
                ? document.getElementById(`optionAll`).classList.add("drink-filter-option-all-selected")
                : document.getElementById(`optionAll`).classList.remove("drink-filter-option-all-selected")

        }, [showAll]
    )



    return (
        <section className="drink-recent-activities">
            <RecentDrink
                id={recentDrink.id}
                name={recentDrink.name}
                type={recentDrink.type}
                timesTried={recentDrink.timesTried}
                dateTime={recentDrink.dateTime}
            />

            <section className="test" >

                <div className="drink-filter-header">Filter Drinks By Type</div>
                <div className="drink-filter-by-type">

                    <div
                        id="optionAll"
                        className="drink-filter-option"
                        onClick={
                            () => {
                                setShowAll(true)
                            }
                        }>All</div>

                    {drinkTypes.map((drinkType) => (
                        <DrinkFilter
                            key={drinkType.id}
                            id={drinkType.id}
                            type={drinkType.type}
                            setFilter={setFilter}
                            filter={filter}
                            setFilterVariable={setFilterVariable}
                            filterVariable={filterVariable}
                            setShowAll={setShowAll}
                            showAll={showAll}

                        />)
                    )}</div>
            </section>

        </section>
    )
}