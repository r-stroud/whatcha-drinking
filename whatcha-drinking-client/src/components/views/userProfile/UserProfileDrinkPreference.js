import { useState, useEffect } from "react"

export const UserProfileDrinkPreference = () => {

    //display drink types

    const url2 = "https://localhost:7189/api/DrinkType/drink_types"

    const displayDrinkTypes = async () => {
        const fetchData = await fetch(`${url2}`)
        const fetchJson = await fetchData.json()
        setDrinkTypes(fetchJson)
    }
    const [drinkTypes, setDrinkTypes] = useState([])

    useEffect(
        () => {
            displayDrinkTypes()
        }, []
    )

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id)
    }

    function allowDrop(ev) {
        ev.preventDefault()
    }

    function drop(ev) {
        ev.preventDefault()
        var data = ev.dataTransfer.getData("text")
        ev.target.appendChild(document.getElementById(data))
    }

    return (
        <>
            <section className="drink-preference">
                <div className="drink-preference-header"> Drink Preferences</div>
                <section className="flex">
                    <section>
                        <div>Banned</div>
                        <section
                            className="drink-preference-dropbox banned"
                            id="test"
                            onDragOver={
                                (ev) => {
                                    allowDrop(ev)
                                }
                            }
                            onDrop={
                                (ev) => {
                                    drop(ev)
                                }
                            }
                        >
                        </section>

                    </section>

                    <section>
                        <div>TBD</div>
                        <section className="drink-preference-dropbox neutral">
                            {drinkTypes.map(x =>
                                <div
                                    className="drink-preference-item"
                                    id={x.id}
                                    draggable="true"
                                    onDragStart={
                                        (ev) => {
                                            drag(ev)
                                        }
                                    }
                                >{x.type}
                                </div>)}
                        </section>
                    </section>
                    <section>
                        <div>Preferred</div>
                        <section
                            className="drink-preference-dropbox preferred"
                            id="test"
                            onDragOver={
                                (ev) => {
                                    allowDrop(ev)
                                }
                            }
                            onDrop={
                                (ev) => {
                                    drop(ev)
                                }
                            }
                        >
                        </section>

                    </section>
                </section>
            </section>
        </>
    )
}