import { useState, useEffect } from "react"
import { getCurrentUser } from "../../utils/Constants"
import { SummaryDrinkItem } from "./SummaryDrinkItem"
import { fetchDrinkTypes, fetchPreferences } from "../../api/Api"

export const SummaryDrinkDetails = ({
    id
}) => {

    // display drinks
    const currentUser = getCurrentUser()

    const displayDrinkTypes = async () => {
        let preferences = await fetchPreferences(currentUser)
        let drinkTypes = await fetchDrinkTypes()
        await setPreferences(preferences)
        await setDrinkTypes(drinkTypes)
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
            let drinkTypesCopy = drinkTypes.map(x => ({ ...x }))

            drinkTypesCopy = drinkTypesCopy.filter(
                x => !preferences
                    .find(y => y.type === x.type && y.preferenceTypeId === 2)
            )

            drinkTypesCopy = drinkTypesCopy.sort((a, b) => a.type.localeCompare(b.type))

            setFilteredDrinkTypes(drinkTypesCopy)

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