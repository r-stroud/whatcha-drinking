import { useEffect, useState } from "react"
import { getCurrentUser } from "../../utils/Constants"
import "./Drinks.css"
import { RecentDrink } from "./RecentDrink"

export const DrinkRecentActivities = () => {

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
        }, []
    )
    console.log(recentDrink)

    return (
        <section className="drink-recent-activities">
            <RecentDrink
                id={recentDrink.id}
                name={recentDrink.name}
                type={recentDrink.type}
                timesTried={recentDrink.timesTried}
                dateTime={recentDrink.dateTime} />

        </section>
    )
}