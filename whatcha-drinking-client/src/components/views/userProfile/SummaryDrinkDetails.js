import { useState, useEffect } from "react"
import { getCurrentUser } from "../../utils/Constants"
import { SummaryDrinkItem } from "./SummaryDrinkItem"

export const SummaryDrinkDetails = ({
    id
}) => {


    // display drinks
    const currentUser = getCurrentUser()

    const url2 = "https://localhost:7189/api/Drink/drinks"
    const url3 = `https://localhost:7189/api/Drink/drink_preferences?userId=${currentUser.uid}`

    const displayDrinks = async () => {

        const fetchData2 = await fetch(`${url3}`)
        const fetchJson2 = await fetchData2.json()
        setPreferences(fetchJson2)

        const fetchData = await fetch(`${url2}`)
        const fetchJson = await fetchData.json()
        setDrinks(fetchJson)

    }

    const [drinks, setDrinks] = useState([])


    // useEffect(
    //     () => {
    //         displayDrinks()
    //     }, []
    // )

    //display drink types

    const url = "https://localhost:7189/api/DrinkType/drink_types"

    const displayDrinkTypes = async () => {

        const fetchData3 = await fetch(`${url3}`)
        const fetchJson3 = await fetchData3.json()
        setPreferences(fetchJson3)

        const fetchData = await fetch(`${url}`)
        const fetchJson = await fetchData.json()
        setDrinkTypes(fetchJson)
    }
    const [drinkTypes, setDrinkTypes] = useState([])
    const [preferences, setPreferences] = useState([])
    const [filteredDrinkTypes, setFilteredDrinkTypes] = useState([])

    useEffect(
        () => {
            displayDrinkTypes()
        }, []
    )

    useEffect(
        () => {
            let copy = drinkTypes.map(x => ({ ...x }))

            copy = copy.filter(
                x => !preferences
                    .find(y => y.type === x.type && y.preferenceTypeId === 2)
            )

            copy = copy.sort((a, b) => a.type.localeCompare(b.type))

            setFilteredDrinkTypes(copy)

        }, [drinkTypes]
    )

    return (
        <>
            <div
                className="drink-summary-title">Drink Status</div>
            <section
                className="drink-summary-container">



                {filteredDrinkTypes.map(x =>

                    <>

                        <section
                            className="summary-drink-details">
                            <div>{x.type}</div>
                            <SummaryDrinkItem
                                type={x.type}
                                id={id}
                            />

                        </section>


                    </>

                )}

            </section>
        </>
    )
}