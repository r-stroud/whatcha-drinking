import { DrinkImgs } from "../../utils/Constants"
import { useEffect } from "react"

export const RecentDrink = ({ id, name, type, image, drinkingNow, timesTried, dateTime }) => {

    //drinkSrc
    let imageSrc = DrinkImgs.find(x => x.name === image)

    return (
        <>
            <section className="recent-drink">
                <section
                    className="drink-frame-container"
                >
                    <div
                        id={`drinkFrame`}
                        className="drink-img-small-frame">
                        {
                            <img
                                id={`drinkImg${id}`}
                                className="drink-img-small"
                                src={imageSrc === undefined ? "" : imageSrc.src} />
                        }
                    </div>
                </section>
                <section
                    className="recent-drink-details">
                    <div
                        className="recent-drink-header">Drinking Now</div>
                    <div
                        id="RecentDrinkDetails"
                    >{`${name}`}<span>{`${type}`}</span>
                        <div>
                            <div
                                className="recent-drink-bttn"
                            >Create Post</div>
                        </div>
                    </div>
                </section>

            </section>

        </>
    )
}