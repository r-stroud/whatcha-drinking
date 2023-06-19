export const DrinkSearchBar = ({
    setSearchValue,
    location
}) => {

    return (
        <>
            <div className="drink-searchbar-header">
                Search By:
            </div>
            <input
                className="drink-searchbar-input"
                type="text"
                placeholder={
                    location === "postView"
                        ? "User Details, Drink Name, or Message Content"
                        : "Drink Name"
                }
                onChange={
                    (e) => {
                        setSearchValue(e.target.value)
                    }
                }>
            </input>
        </>
    )
}