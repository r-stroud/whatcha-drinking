import { DrinkFilter } from "./DrinkFilter"

export const DrinkFilterContainer = ({
    drinkTypes,
    setFilter,
    filter,
    setFilterVariable,
    filterVariable,
    setShowAll,
    showAll
}) => {

    return (
        <>
            <div className="drink-filter-header">Filter Drinks By Type</div>
            <div className="drink-filter-by-type">

                <div
                    id="optionAll"
                    className="drink-filter-option"
                    onClick={
                        () => {
                            setShowAll(true)
                        }
                    }>All</div>

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

                    />)
                )}</div>
        </>
    )

}