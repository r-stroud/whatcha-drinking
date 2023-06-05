import { useEffect, useState } from "react"

export const DrinkFilter = ({
    id,
    type,
    filter,
    setFilter,
    setFilterVariable,
    setShowAll,
    showAll,
    filterVariable,
    setFilterByPreference,
    filterByPreference }) => {

    const [selected, setSelected] = useState(false)

    useEffect(
        () => {

            selected
                ? document.getElementById(`drinkFilterOption${id}`).classList
                    .add("drink-filter-option-selected")
                : document.getElementById(`drinkFilterOption${id}`).classList
                    .remove("drink-filter-option-selected")

        }, [selected]
    )

    //set button colors based on all button selection

    useEffect(
        () => {
            if (showAll === true) {
                document.getElementById(`drinkFilterOption${id}`).classList
                    .add("drink-filter-option-all-selected")
                setSelected(false)
            } else if (filterByPreference === true) {
                document.getElementById(`drinkFilterOption${id}`).classList
                    .remove("drink-filter-option-all-selected")
                setSelected(false)
            }

            else {
                document.getElementById(`drinkFilterOption${id}`).classList
                    .remove("drink-filter-option-all-selected")
            }


        }, [showAll, filterByPreference]
    )

    return (

        <section>

            <div
                id={`drinkFilterOption${id}`}
                className="drink-filter-option"
                onClick={(
                    (e) => {
                        setShowAll(false)
                        setFilterByPreference(false)
                        setFilter(!filter)
                        setFilterVariable(type)
                        setSelected(!selected)

                    }
                )}>{type}</div>
        </section>
    )
}