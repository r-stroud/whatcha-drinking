import { useState, useEffect } from "react"
import { getCurrentUser } from "../../utils/Constants"

export const UserProfileDrinkPreference = () => {

    const currentUser = getCurrentUser()

    // update preferences

    const url = "https://localhost:7189/api/Drink/drink_preference"


    const addPreference = async (id, number) => {
        console.log(number)
        await fetch(`${url}`, {
            method: "PUT",
            body: JSON.stringify({
                userId: currentUser.uid,
                drinkTypeId: id,
                preferenceTypeId: number
            }),
            headers: {
                "Content-Type": "application/json"
            }

        })
    }

    // delete preference

    const deletePreference = async (id) => {
        const fetchData = await fetch(`https://localhost:7189/api/Drink/remove_preference/${id}`,
            { method: "DELETE" })

    }

    function dropAndDelete(ev) {
        ev.preventDefault()
        var data = ev.dataTransfer.getData("text")
        var data2 = ev.dataTransfer.getData("text2")
        deletePreference(data2)
        ev.target.appendChild(document.getElementById(data))
    }

    const dropDeleteUpdate = async (ev, prefNo) => {
        ev.preventDefault()
        var data = ev.dataTransfer.getData("text")
        var data2 = ev.dataTransfer.getData("text2")
        await deletePreference(data2)
        await addPreference(data, prefNo)
        ev.target.appendChild(document.getElementById(data))
    }



    //display drink types and drink preferences
    const url2 = `https://localhost:7189/api/Drink/drink_preferences?userId=${currentUser.uid}`

    const url3 = "https://localhost:7189/api/DrinkType/drink_types"

    const displayDrinkPreferences = async () => {

        // drink types -- default

        const fetchData = await fetch(`${url3}`)
        const fetchJson = await fetchData.json()
        setDrinkTypes(fetchJson)

        // selected preferences

        const fetchData2 = await fetch(`${url2}`)
        const fetchJson2 = await fetchData2.json()
        setDrinkPreferences(fetchJson2)

    }
    const [drinkTypes, setDrinkTypes] = useState([])

    const [drinkPreferences, setDrinkPreferences] = useState([])

    useEffect(
        () => {
            displayDrinkPreferences()
        }, []
    )

    function drag(ev, value = null) {
        ev.dataTransfer.setData("text", ev.target.id)
        value !== null ? ev.dataTransfer.setData("text2", value) : <></>

    }

    function allowDrop(ev) {
        ev.preventDefault()
    }

    function drop(ev, prefNo) {
        ev.preventDefault()
        var data = ev.dataTransfer.getData("text")
        addPreference(data, prefNo)
        ev.target.appendChild(document.getElementById(data))
    }

    return (
        <>

            {/* enum notes 
            1 = preferred
            2= banned */}

            <section className="drink-preference">
                <div className="drink-preference-header"> Drink Preferences</div>
                <section className="flex">

                    {/* banned items */}

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
                                    dropDeleteUpdate(ev, 2)
                                }
                            }
                        >

                            {drinkPreferences
                                .filter(x => x.preferenceTypeId === 2)
                                .map(x =>
                                    <div
                                        className="drink-preference-item"
                                        key={x.id}
                                        id={x.drinkTypeId}
                                        draggable="true"
                                        onDragStart={
                                            (ev) => {
                                                drag(ev, x.id)
                                            }
                                        }
                                    >{x.type}
                                    </div>)}


                        </section>

                    </section>

                    <section>

                        {/* default items */}

                        <div>TBD</div>
                        <section
                            className="drink-preference-dropbox neutral"
                            onDragOver={
                                (ev) => {
                                    allowDrop(ev)
                                }
                            }
                            onDrop={
                                (ev) => {
                                    dropAndDelete(ev)
                                }
                            }
                        >
                            {drinkTypes
                                .filter(x => !drinkPreferences.find(y => y.drinkTypeId === x.id))
                                .map(x =>
                                    <div
                                        className="drink-preference-item"
                                        key={x.id}
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

                        {/* preferred items */}

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
                                    dropDeleteUpdate(ev, 1)
                                }
                            }
                        >

                            {drinkPreferences
                                .filter(x => x.preferenceTypeId === 1)
                                .map(x =>
                                    <div
                                        className="drink-preference-item"
                                        key={x.id}
                                        id={x.drinkTypeId}
                                        draggable="true"
                                        onDragStart={
                                            (ev) => {
                                                drag(ev, x.id)
                                            }
                                        }
                                    >{x.type}
                                    </div>)}

                        </section>

                    </section>
                </section>
            </section>
        </>
    )
}