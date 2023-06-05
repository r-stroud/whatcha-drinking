import { DrinkFilter } from "./DrinkFilter"

export const DrinkFilterContainer = ({
    drinkTypes,
    setFilter,
    filter,
    setFilterVariable,
    filterVariable,
    setShowAll,
    showAll,
    setFilterByPreference,
    filterByPreference
}) => {

    return (
        <>
            <div className="drink-filter-header">Filter Drinks By Type</div>
            <div className="drink-filter-by-type">
                <section
                    style={{ height: "100%" }}>
                    <div
                        id="optionAll"
                        className="drink-filter-option"
                        onClick={
                            () => {
                                setShowAll(true)
                            }
                        }>All</div>

                    <div
                        id="optionPreferences"
                        className="drink-filter-option"
                        onClick={
                            () => {
                                setFilterByPreference(true)
                                setShowAll(false)
                            }
                        }>
                        Preferences
                    </div>
                </section>
                {drinkTypes.map((drinkType) => (
                    <DrinkFilter
                        key={drinkType.id}
                        id={drinkType.id}
                        type={drinkType.type}
                        setFilter={setFilter}
                        filter={filter}
                        setFilterVariable={setFilterVariable}
                        filterVariable={filterVariable}
                        setShowAll={setShowAll}
                        showAll={showAll}
                        setFilterByPreference={setFilterByPreference}
                        filterByPreference={filterByPreference}

                    />)
                )}</div>
        </>
    )

}