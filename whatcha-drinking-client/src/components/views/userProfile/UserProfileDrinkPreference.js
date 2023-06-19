import { useState, useEffect } from "react"
import { getCurrentUser } from "../../utils/Constants"

export const UserProfileDrinkPreference = () => {

    const currentUser = getCurrentUser()

    // update preferences

    const url = "https://localhost:7189/api/Drink/drink_preference"


    const addPreference = async (id, number) => {
        console.log(id)
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

    // update preference drop table

    const dropUpdate = async (ev, prefNo) => {
        ev.preventDefault()

        var data = ev.dataTransfer.getData("text")

        await ev.target.appendChild(document.getElementById(data))
        await addPreference(data, prefNo)

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

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id)
    }

    function allowDrop(ev) {
        ev.preventDefault()
    }

    // preference none

    useEffect(
        () => {

            const array = []

            drinkTypes
                .filter(x => !drinkPreferences.find(y => y.drinkTypeId === x.id))
                .forEach(x => array.push(x))

            drinkTypes
                .filter(x => drinkPreferences.find(y => y.drinkTypeId === x.id && y.preferenceTypeId === 0))
                .forEach(x => array.push(x))

            setNone(array.sort((a, b) => a.type.localeCompare(b.type)))

        }, [drinkPreferences]
    )

    const [none, setNone] = useState([])

    return (
        <>

            {/* enum notes 
            1 = preferred
            2= banned */}

            <section className="drink-preference">
                <div className="drink-preference-header"> Drink Preferences</div>
                <section className="drink-preference-container">

                    <section>

                        {/* default items */}

                        <div
                            className="drink-preference-subheader-n">None
                            <span></span>
                        </div>
                        <section
                            id="noneDropBox"
                            className="drink-preference-dropbox neutral"
                            onDragOver={
                                (ev) => {
                                    allowDrop(ev)
                                }
                            }
                            onDrop={
                                (ev) => {
                                    // dropAndDelete(ev)
                                    dropUpdate(ev, 0)
                                }
                            }
                        >
                            {none
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

                        <div
                            className="drink-preference-subheader-p">Preferred
                            <span></span>
                        </div>
                        <section
                            className="drink-preference-dropbox preferred"
                            id="preferredDropBox"
                            onDragOver={
                                (ev) => {
                                    allowDrop(ev)
                                }
                            }
                            onDrop={
                                (ev) => {
                                    dropUpdate(ev, 1)

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
                                                drag(ev)
                                            }
                                        }
                                    >{x.type}
                                    </div>)}

                        </section>

                    </section>

                    {/* banned items */}

                    <section>

                        <div
                            className="drink-preference-subheader-na">
                            Never Again
                            <span>These items will be removed from all sections of the application.</span>
                        </div>
                        <section
                            className="drink-preference-dropbox never-again"
                            id="NeverAgainDropBox"
                            onDragOver={
                                (ev) => {
                                    allowDrop(ev)
                                }
                            }
                            onDrop={
                                (ev) => {
                                    dropUpdate(ev, 2)

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
                                                drag(ev)
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