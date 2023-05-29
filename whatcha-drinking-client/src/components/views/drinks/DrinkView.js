import { useState, useEffect } from "react"
import { Drink } from "./Drink"

export const DrinkView = () => {

    const url = "https://localhost:7189/api/Drink/drinks"

    const displayDrinks = async () => {
        const fetchData = await fetch(`${url}`)
        const fetchJson = await fetchData.json()
        setDrinks(fetchJson)
    }

    const [drinks, setDrinks] = useState([])

    useEffect(
        () => {
            displayDrinks()
        }, []
    )


    return (
        <section className="drink-view">
            {drinks.map((drink) => (
                <Drink
                    id={drink.id}
                    name={drink.name}
                    type={drink.type}
                />
            ))}
        </section>
    )
}