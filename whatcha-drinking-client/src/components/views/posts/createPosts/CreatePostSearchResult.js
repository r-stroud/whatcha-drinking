import { useEffect } from "react"
import { DrinkImgs } from "../../../utils/Constants"

export const CreatePostSearchResult = ({
    id,
    type,
    name,
    image,
    index,
    setSearchValue,
    setDrinkSelected,
    setDrinkValue,
    drinkSelected
}) => {

    // image src

    let imageSrc = DrinkImgs.find(x => x.name === image)




    return (
        <>
            <section
                className="create-post-result"
                onClick={
                    () => {
                        setSearchValue(name)
                        setDrinkSelected(true)
                        setDrinkValue(
                            {
                                id: id,
                                name: name,
                                type: type,
                                image: imageSrc === undefined ? "" : imageSrc.src
                            }
                        )
                    }
                }>

                <div
                    className="create-post-result-name">

                    <span
                        className={index > 8 ? `create-post-result-largenumber` : `create-post-result-number`}>
                        {/* {index + 1} */}
                        <img
                            src={imageSrc.src} />
                    </span>

                    {name}

                    <span
                        className="create-post-result-type">{type}
                    </span>
                </div>
            </section>
        </>
    )
}