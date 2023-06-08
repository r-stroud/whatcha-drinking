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

    // delete preference

    const deletePreference = async (id) => {
        const fetchData = await fetch(`https://localhost:7189/api/Drink/remove_preference/${id}`,
            { method: "DELETE" })

    }

    const dropAndDelete = async (ev) => {
        ev.preventDefault()
        var data = ev.dataTransfer.getData("text")
        var data2 = ev.dataTransfer.getData("text2")
        await deletePreference(data2)
        await ev.target.appendChild(document.getElementById(data))
    }

    const dropDeleteUpdate = async (ev, prefNo) => {
        ev.preventDefault()
        var data = ev.dataTransfer.getData("text")
        console.log("drop data", data)
        var data2 = ev.dataTransfer.getData("text2")
        console.log("drop data2", data2)
        data2 ? await deletePreference(data2) : <></>
        await addPreference(data, prefNo)
        await ev.target.appendChild(document.getElementById(data))
    }

    // const test = async (ev, prefNo) => {
    //     await dropDeleteUpdate(ev, prefNo)
    //     await displayDrinkPreferences()
    // }


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

    const [check, setCheck] = useState("")

    console.log("id check", check)

    useEffect(
        () => {
            displayDrinkPreferences()
        }, []
    )

    function drag(ev, value = null) {
        ev.dataTransfer.setData("text", ev.target.id)
        console.log("drag target id", ev.target.id)
        value !== null ? ev.dataTransfer.setData("text2", value) : <></>
        console.log("drag value", value)

    }

    function allowDrop(ev) {
        ev.preventDefault()
    }

    return (
        <>

            {/* enum notes 
            1 = preferred
            2= banned */}

            <section className="drink-preference">
                <div className="drink-preference-header"> Drink Preferences</div>
                <section className="flex">

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
                                        onClick={
                                            (ev) => {
                                                setCheck(ev.target.id)
                                            }
                                        }
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
                                    dropDeleteUpdate(ev, 1)
                                    // test(ev, 1)
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
                                        onClick={
                                            () => {
                                                setCheck(x.id)
                                            }
                                        }
                                        onDragStart={
                                            (ev) => {
                                                drag(ev, x.id)
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
                                    dropDeleteUpdate(ev, 2)
                                    // test(ev, 2)
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
                                        onClick={
                                            () => {
                                                setCheck(x.id)
                                            }
                                        }
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