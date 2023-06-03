export const DrinkSearchBar = ({
    setSearchValue
}) => {

    return (
        <>
            <div className="drink-searchbar-header">
                Search Drinks By Name
            </div>
            <input
                className="drink-searchbar-input"
                type="text"
                onChange={
                    (e) => {
                        setSearchValue(e.target.value)
                    }
                }>
            </input>
        </>
    )
}