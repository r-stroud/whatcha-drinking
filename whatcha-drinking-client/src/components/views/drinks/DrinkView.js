import { useState, useEffect } from "react"
import { Drink } from "./Drink"
import { SubMenuView } from "../subMenu/SubMenuView"
import { getCurrentUser } from "../../utils/Constants"
import { fetchDrinks, fetchPreferences } from "../../api/Api"

export const DrinkView = () => {

    const currentUser = getCurrentUser()

    //refresh current drink

    const [drinkingNow, setDrinkingNow] = useState(false)

    // display drinks

    const fetchDrinksAndPreferences = async () => {
        let preferences = await fetchPreferences(currentUser)
        let drinks = await fetchDrinks()
        await setPreferences(preferences)
        await setDrinks(drinks)
    }

    const [drinks, setDrinks] = useState([])

    useEffect(
        () => {
            fetchDrinksAndPreferences()
        }, [drinkingNow]
    )

    //display preferences

    const [preferences, setPreferences] = useState([])

    const [filterByPreference, setFilterByPreference] = useState(false)

    // display all drinks by default / filter selection

    const [showAll, setShowAll] = useState(true)

    //filtered drinks

    const [filter, setFilter] = useState(false) // checks if filter bttn is clicked
    const [filterVariable, setFilterVariable] = useState("empty") // name of filter bttn clicked
    const [filterArray, setFilterArray] = useState([]) // array of selected filter bttns
    const [filterDrinksOn, setFilteredDrinksOn] = useState(false) // filters drinks
    const [filteredDrinks, setFilteredDrinks] = useState([]) // array of filtered drinks

    useEffect(
        () => {
            let filterArrayCopy = filterArray
            if (filterArrayCopy.includes("empty")) {
                let index = filterArrayCopy.indexOf("empty")
                index !== -1
                    ? filterArrayCopy.splice(index, 1)
                    : <></>
            }

            if (filterArrayCopy.includes(filterVariable)) {
                let index = filterArrayCopy.indexOf(filterVariable)
                index !== -1
                    ? filterArrayCopy.splice(index, 1)
                    : <></>
            } else {
                filterArrayCopy.push(filterVariable)
            }
            showAll === true || filterByPreference === true
                ? setFilterArray([])
                : setFilterArray(filterArrayCopy)
            setFilteredDrinksOn(!filterDrinksOn)
        }, [filter, showAll, filterByPreference]
    )

    useEffect(
        () => {

            let drinksCopy = drinks.map(x => ({ ...x }))

            drinksCopy = drinksCopy.filter(
                x => !preferences
                    .find(y => y.type === x.type && y.preferenceTypeId === 2)
            )

            if (showAll === true) {

                setFilteredDrinks(drinksCopy)

            } else if (filterByPreference === true) {
                const drinksCopyFiltered = drinksCopy.filter(x => preferences
                    .find(y => y.type === x.type && y.preferenceTypeId === 1))
                setFilteredDrinks(drinksCopyFiltered)
            }

            else {

                const newArray = []

                filterArray.map(filterItem => {
                    drinksCopy.filter(drinksItem => drinksItem.type
                        .toUpperCase() === filterItem.toUpperCase()).forEach(e => newArray.push(e))
                })
                setFilteredDrinks(newArray)
            }

        }, [filterDrinksOn, showAll, drinks, filterByPreference]
    )

    // searched drinks

    const [searchValue, setSearchValue] = useState("")
    const [searchReults, setSearchResults] = useState([])

    useEffect(
        () => {
            const filteredDrinksCopy = filteredDrinks.map(x => ({ ...x }))
            const searchResults = filteredDrinksCopy
                .filter(x => x.name.toUpperCase()
                    .includes(searchValue.toUpperCase()))

            const searchResultsSorted = searchResults
                .sort((a, b) => {
                    if (a.type === b.type) {
                        return a.name.localeCompare(b.name)
                    }
                    return a.type.localeCompare(b.type)
                }
                )

            setSearchResults(searchResultsSorted)
        }, [searchValue, filteredDrinks]
    )

    return (
        <section>
            <SubMenuView
                drinkingNow={drinkingNow}
                setFilter={setFilter}
                filter={filter}
                setFilterVariable={setFilterVariable}
                filterVariable={filterVariable}
                setShowAll={setShowAll}
                showAll={showAll}
                setSearchValue={setSearchValue}
                setFilterByPreference={setFilterByPreference}
                filterByPreference={filterByPreference}
            />
            <section className="drink-view">

                {searchReults.length < 1
                    ? <Drink
                        notFound={true} />
                    : searchReults.map((drink) => (
                        <Drink
                            key={drink.id}
                            id={drink.id}
                            name={drink.name}
                            type={drink.type}
                            image={drink.image}
                            setDrinkingNow={setDrinkingNow}
                            drinkingNow={drinkingNow}
                            notFound={false}
                        />
                    ))}
            </section>
        </section>
    )
}