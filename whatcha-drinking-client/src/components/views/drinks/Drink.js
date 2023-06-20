import { useEffect, useState } from "react"
import { DrinkImgs, getCurrentUser } from "../../utils/Constants"
import "./Drinks.css"
import { fetchTimesTried, updateDrink } from "../../api/Api"

export const Drink = ({
    id,
    name,
    type,
    image,
    setDrinkingNow,
    drinkingNow,
    notFound }) => {

    //drinkSrc
    let imageSrc = DrinkImgs.find(x => x.name === image)

    // current user

    const firebaseId = getCurrentUser().uid

    // add drink

    const updateDrinkAndDOM = async () => {
        await updateDrink(firebaseId, id)
        await setUpdateTimesTried(!updateTimesTried)
        await setDrinkingNow(!drinkingNow)
    }

    // get times tried

    const displayTimesTried = async () => {
        let results = await fetchTimesTried(firebaseId, id)
        await setTimesTried(results)
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
                    notFound ? <></> : document.getElementById(`drinkImg${id}`).style.bottom = "-50px"
                }
            }
            onMouseLeave={
                () => {
                    notFound ? <></> : document.getElementById(`drinkImg${id}`).style.bottom = "-150px"
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
                <>
                    <div
                        className="drink-bttn"
                        onClick={(
                            () => {
                                document.getElementById(`drinkFrame`).style.width = "0"
                                document.getElementById("RecentDrinkDetails").style.top = "-100px"
                                setTimeout(
                                    () => {
                                        document.getElementById(`drinkFrame`).style.width = "100px"
                                        document.getElementById("RecentDrinkDetails").style.top = "0px"
                                    }, 400
                                )

                                setTimeout(
                                    () => {

                                        updateDrinkAndDOM()
                                    }, 400
                                )
                            }
                        )}
                    >Drinking Now</div>

                    <img
                        id={`drinkImg${id}`}
                        className="drink-img"
                        src={imageSrc === undefined ? "" : imageSrc.src}
                    />
                </>}

        </section>
    )
}