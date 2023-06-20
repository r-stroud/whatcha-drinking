import { VictoryPie, VictoryTheme } from "victory"
import { useState, useEffect } from "react"
import { getCurrentUser } from "../../utils/Constants"
import { fetchDrinks, fetchUserDrinks } from "../../api/Api"

export const SummaryDrinkItem = ({
    type,
    id
}) => {

    // get user drinks and all drinks

    const displayDrinks = async () => {
        let userDrinks = await fetchUserDrinks(id)
        let drinks = await fetchDrinks()
        await setUserDrinks(userDrinks)
        await setDrinks(drinks)

    }

    const [userDrinks, setUserDrinks] = useState([])
    const [drinks, setDrinks] = useState([])

    useEffect(
        () => {
            displayDrinks()
        }, [id]
    )

    // number of drinks by type in the database

    const [typeLength, setTypeLength] = useState(0)

    useEffect(
        () => {
            let drinksCopy = drinks.map(x => ({ ...x }))
            let filteredDrinksCopy = drinksCopy.filter(x => x.type === type)
            setTypeLength(filteredDrinksCopy.length)


        }, [drinks]
    )

    // number of drinks by type the user has tried

    const [userTypeLength, setUserTypeLength] = useState(0)

    useEffect(
        () => {
            let userDrinksCopy = userDrinks.map(x => ({ ...x }))
            let filteredUserDrinksCopy = userDrinksCopy.filter(x => x.type === type)
            setUserTypeLength(filteredUserDrinksCopy.length)

        }, [userDrinks]
    )

    // percentage

    const percentage = Math.round(userTypeLength / typeLength * 100)

    return (<>
        <section
            className="pie-container">
            <VictoryPie
                padAngle={0}
                // used to hide labels
                labelComponent={<span />}
                innerRadius={240}
                width={800} height={800}
                data={[{ 'key': "", 'y': percentage }, { 'key': "", 'y': (100 - percentage) }]}
                colorScale={["rgb(210, 178, 98)", "rgb(54,54,54)"]}
            />
            <div
                className={percentage === 100 ? "pie-text-100" : "pie-text"}>{`${percentage}%`}
            </div>
        </section>
    </>)
}