import { useEffect } from "react"
import { DrinkImgs } from "../../utils/Constants"

export const CreatePostSearchResult = ({
    type,
    name,
    image,
    setBackground,
    index,
    setSearchValue
}) => {

    // image src

    let imageSrc = DrinkImgs.find(x => x.name === image)




    return (
        <>
            <section
                className="create-post-result"
                onClick={
                    () => {
                        setBackground(
                            imageSrc === undefined ? "" : imageSrc.src
                        )
                        setSearchValue(name)
                    }
                }>

                <div
                    className="create-post-result-name">

                    <span
                        className={index > 8 ? `create-post-result-largenumber` : `create-post-result-number`}>
                        {index + 1}
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