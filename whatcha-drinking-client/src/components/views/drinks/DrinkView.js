import { useState, useEffect } from "react"
import { Drink } from "./Drink"
import { DrinkRecentActivities } from "./DrinkRecentActivities"

export const DrinkView = () => {

    //display drinkTypes




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

    //refresh current drink

    const [drinkingNow, setDrinkingNow] = useState(false)

    // display all drinks by default / filter selection

    const [showAll, setShowAll] = useState(true)

    //filtered drinks

    const [filter, setFilter] = useState(false)
    const [filterVariable, setFilterVariable] = useState("empty")
    const [filterArray, setFilterArray] = useState([])
    const [filterDrinksOn, setFilteredDrinksOn] = useState(false)
    const [filteredDrinks, setFilteredDrinks] = useState([])

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
            showAll ? setFilterArray([]) : setFilterArray(copyArray)
            setFilteredDrinksOn(!filterDrinksOn)
        }, [filter, showAll]
    )

    useEffect(
        () => {


            const copy = drinks.map(x => ({ ...x }))

            if (showAll === true) {

                setFilteredDrinks(copy)

            } else {

                const newArray = []

                filterArray.map(fa => {
                    copy.filter(c => c.type.toUpperCase() === fa.toUpperCase()).forEach(e => newArray.push(e))

                })

                setFilteredDrinks(newArray)

            }

        }, [filterDrinksOn, showAll, drinks]
    )

    useEffect(
        () => {
            const copy = drinks.map(x => ({ ...x }))

        }, [filter]
    )

    return (
        <section>
            <DrinkRecentActivities
                drinkingNow={drinkingNow}
                setFilter={setFilter}
                filter={filter}
                setFilterVariable={setFilterVariable}
                filterVariable={filterVariable}
                setShowAll={setShowAll}
                showAll={showAll}
            />
            <section className="drink-view">

                {filteredDrinks.map((drink) => (
                    <Drink
                        key={drink.id}
                        id={drink.id}
                        name={drink.name}
                        type={drink.type}
                        setDrinkingNow={setDrinkingNow}
                        drinkingNow={drinkingNow}
                    />
                ))}
            </section>
        </section>
    )
}