export const DrinkFilter = ({ id, type, filter, setFilter, setFilterVariable, filterVariable }) => {
    return (

        <section>
            {/* <div>{id}</div> */}
            <div
                className="drink-filter-option"
                onClick={(
                    (e) => {
                        setFilter(!filter)
                        setFilterVariable(type)
                    }
                )}>{type}</div>
        </section>
    )
}