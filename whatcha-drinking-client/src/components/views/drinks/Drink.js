import "./Drinks.css"

export const Drink = ({ id, name, type }) => {
    return (
        <section
            className="drink"
            onMouseEnter={
                () => {
                    document.getElementById(`drinkImg${id}`).style.bottom = "-50px"
                }
            }
            onMouseLeave={
                () => {
                    document.getElementById(`drinkImg${id}`).style.bottom = "-150px"
                }
            }

        >
            <div className="drink-type">{type}</div>
            <div className="drink-name">{name}</div>
            <img
                id={`drinkImg${id}`}
                className="drink-img"
                src={require("../../../images/four-roses.png")} />
        </section>
    )
}