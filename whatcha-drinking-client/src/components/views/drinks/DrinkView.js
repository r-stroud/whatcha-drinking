import { useState, useEffect } from "react"
import { Drink } from "./Drink"
import { SubMenuView } from "../subMenu/SubMenuView"
import { getCurrentUser } from "../../utils/Constants"

export const DrinkView = () => {

    const currentUser = getCurrentUser()

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

    const [filterByPreference, setFilterByPreference] = useState(false)

    //refresh current drink

    const [drinkingNow, setDrinkingNow] = useState(false)

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


            let copy = drinks.map(x => ({ ...x }))

            copy = copy.filter(
                x => !preferences
                    .find(y => y.type === x.type && y.preferenceTypeId === 2)
            )

            if (showAll === true) {

                setFilteredDrinks(copy)

            } else if (filterByPreference === true) {
                const filterCopy = copy.filter(x => preferences
                    .find(y => y.type === x.type && y.preferenceTypeId === 1))
                setFilteredDrinks(filterCopy)
            }

            else {

                const newArray = []

                filterArray.map(fa => {
                    copy.filter(c => c.type
                        .toUpperCase() === fa.toUpperCase()).forEach(e => newArray.push(e))

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
            const copy = filteredDrinks.map(x => ({ ...x }))
            const searchResults = copy.filter(x => x.name.toUpperCase().includes(searchValue.toUpperCase()))

            setSearchResults(searchResults)
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