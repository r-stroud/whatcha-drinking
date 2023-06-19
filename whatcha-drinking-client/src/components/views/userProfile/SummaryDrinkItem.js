import { VictoryPie, VictoryTheme } from "victory"
import { useState, useEffect } from "react"
import { getCurrentUser } from "../../utils/Constants"

export const SummaryDrinkItem = ({
    type,
    id
}) => {

    // get user drinks

    const url = `https://localhost:7189/api/Drink/user_drinks?userId=${id}`

    // get all drinks

    const url2 = "https://localhost:7189/api/Drink/drinks"

    const displayDrinks = async () => {

        const fetchData = await fetch(`${url}`)
        const fetchJson = await fetchData.json()
        setUserDrinks(fetchJson)

        const fetchData2 = await fetch(`${url2}`)
        const fetchJson2 = await fetchData2.json()
        setDrinks(fetchJson2)

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
            let copy = drinks.map(x => ({ ...x }))
            let filterCopy = copy.filter(x => x.type === type)
            setTypeLength(filterCopy.length)


        }, [drinks]
    )

    // number of drinks by type the user has tried

    const [userTypeLength, setUserTypeLength] = useState(0)

    useEffect(
        () => {
            let copy = userDrinks.map(x => ({ ...x }))
            let filterCopy = copy.filter(x => x.type === type)
            setUserTypeLength(filterCopy.length)


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