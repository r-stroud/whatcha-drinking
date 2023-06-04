import { useEffect, useState } from "react"
import { DrinkImg, getCurrentUser } from "../../utils/Constants"
import "./Drinks.css"

export const Drink = ({
    id,
    name,
    type,
    setDrinkingNow,
    drinkingNow,
    notFound }) => {

    const firebaseId = getCurrentUser().uid

    const url = `https://localhost:7189/api/Drink/add_drink`

    // const resetDrinkPosition = () => {
    //     document.getElementById(`drinkImg${id}`).style.bottom = "-150px";
    // }

    const updateDrink = async () => {
        await fetch(`${url}`, {
            method: "POST",
            body: JSON.stringify({
                userId: firebaseId,
                drinkId: id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        await setUpdateTimesTried(!updateTimesTried)
        await setDrinkingNow(!drinkingNow)
        // await resetDrinkPosition()
    }

    // get times tried

    const url2 = `https://localhost:7189/api/Drink/times_tried?userId=${firebaseId}&drinkId=${id}`

    const displayTimesTried = async () => {
        const fetchData = await fetch(`${url2}`)
        const fetchJson = await fetchData.json()
        setTimesTried(fetchJson)
    }

    const [timesTried, setTimesTried] = useState({
        timesTried: 0
    })

    const [updateTimesTried, setUpdateTimesTried] = useState(false)

    useEffect(
        () => {

            notFound ? <></> : displayTimesTried()
        }, [, updateTimesTried]
    )

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

            {notFound
                ? <div className="drink-name">No Results Found</div>
                : <div className="drink-name">{name}</div>}

            {notFound
                ? <div className="drinkcount-user">
                    Sorry, unfortunately we were unable to find any matching results.
                    <span className="no-results-span">Please try a different search.</span>
                </div> :
                <>
                    {timesTried.timesTried !== 1
                        ? <div className="drinkcount-user">You've tried this drink <span>{timesTried.timesTried}</span> times</div>
                        : <div className="drinkcount-user">You've tried this drink <span>{timesTried.timesTried}</span> time</div>}
                </>}

            <div className="drinkcount-total"></div>

            {notFound
                ? <></> :
                <div
                    className="drink-bttn"
                    onClick={(
                        () => {
                            updateDrink()

                        }

                    )}
                >Drinking Now</div>}

            <img
                id={`drinkImg${id}`}
                className="drink-img"
                src={DrinkImg} />

        </section>
    )
}