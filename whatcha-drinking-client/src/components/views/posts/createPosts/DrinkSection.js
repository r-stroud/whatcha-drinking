import { useEffect, useState } from "react"
import { CreatePostSearchResult } from "./CreatePostSearchResult"

export const DrinkSection = ({
    searchValue,
    setSearchValue,
    drinkSelected,
    setDrinkSelected,
    results,
    setDrinkValue,
    drinkValue,
    setPost,
    post,
    sectionConfirmed,
    setSectionConfirmed
}) => {

    function updatePostDrinkId() {
        let copy = post
        copy.drinkId = drinkValue.id
        setPost(copy)
    }

    // display functions

    function drinkDisplay() {

        document.getElementById("createPostDrink")
            .style.right = "50vw"
        document.getElementById("createPostDrink")
            .style.width = "0vw"
    }

    function messageDisplay() {

        document.getElementById("createPostDrink")
            .style.right = "50vw"
        document.getElementById("createPostDrink")
            .style.width = "0vw"

        setTimeout(
            () => {
                document.getElementById("createPostMessage")
                    .style.left = "0vw"
                document.getElementById("createPostMessage")
                    .style.width = "100%"
            }, 200
        )
    }


    return (
        <fieldset className="create-post-section">

            <section>
                <div
                    className="create-post-number">
                    1
                </div>
            </section>

            <section>
                <label>Drink<span>optional</span></label>
                <input
                    type="text"
                    className="create-post-searchbar"
                    value={searchValue}
                    onChange={
                        (e) => {
                            setSearchValue(e.target.value)
                        }
                    }
                />

                <div
                    className="create-post-form-drink-results">
                    {results.map((x, i) =>
                        <>
                            <CreatePostSearchResult
                                key={x.id}
                                id={x.id}
                                type={x.type}
                                name={x.name}
                                image={x.image}
                                index={i}
                                setSearchValue={setSearchValue}
                                setDrinkSelected={setDrinkSelected}
                                drinkSelected={drinkSelected}
                                setDrinkValue={setDrinkValue} />
                        </>)}

                </div>



            </section>

            <section>

                <div>
                    {drinkSelected
                        ?
                        <section
                            className="create-post-confirm-drink-selection">
                            <section>
                                <div
                                    className="create-post-confirm-drink-selection-header">
                                    Selected
                                </div>
                                <div>
                                    {drinkValue.name}

                                    <span>{drinkValue.type}</span>
                                </div>

                            </section>
                            <section
                                className="create-post-confirm-bttn"
                                onClick={
                                    () => {

                                        document.getElementById(`createPostTitleDrink`)
                                            .style.left = "0vw"

                                        updatePostDrinkId()

                                        setSectionConfirmed(sectionConfirmed === 0
                                            ? sectionConfirmed + 1
                                            : sectionConfirmed)

                                        sectionConfirmed > 1
                                            ? drinkDisplay()
                                            : messageDisplay()

                                    }
                                }>
                                Confirm
                            </section>
                        </section>
                        : <></>}
                </div>
            </section>

        </fieldset>
    )
}