import { getCurrentUser } from "../../utils/Constants"
import "./Drinks.css"

export const Drink = ({ id, name, type, timesTried, setUpdateDom, updateDom }) => {

    const userId = getCurrentUser().uid
    console.log(userId)

    const url = `https://localhost:7189/api/Drink/add-drink`

    // (fetch(`${url}`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //         userId: "",
    //         drinkId: ""
    //     }),
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // }))

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

            {timesTried !== 1
                ? <div className="drinkcount-user">You've tried this drink <span>{timesTried}</span> times</div>
                : <div className="drinkcount-user">You've tried this drink <span>{timesTried}</span> time</div>}

            <div className="drinkcount-total"></div>

            <div
                className="drink-bttn"
                onClick={(
                    () => {

                        fetch(`${url}`, {
                            method: "POST",
                            body: JSON.stringify({
                                userId: 1,
                                drinkId: id
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then(setUpdateDom(!updateDom))

                    }

                )}
            >Drinking Now</div>
            <img
                id={`drinkImg${id}`}
                className="drink-img"
                src={require("../../../images/four-roses.png")} />
        </section>
    )
}