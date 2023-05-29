import { useState, useEffect } from "react"
import { Drink } from "./Drink"
import { DrinkRecentActivities } from "./DrinkRecentActivities"

export const DrinkView = () => {

    const url = "https://localhost:7189/api/Drink/drinks"

    const displayDrinks = async () => {
        const fetchData = await fetch(`${url}`)
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


    return (
        <section>
            <DrinkRecentActivities />
            <section className="drink-view">

                {drinks.map((drink) => (
                    <Drink
                        key={drink.id}
                        id={drink.id}
                        name={drink.name}
                        type={drink.type}
                        timesTried={drink.timesTried}
                        setUpdateDom={setUpdateDom}
                        updateDom={updateDom}
                    />
                ))}
            </section>
        </section>
    )
}