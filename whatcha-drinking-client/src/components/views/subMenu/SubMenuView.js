import { useEffect, useState } from "react"
import { getCurrentUser } from "../../utils/Constants"
import "../drinks/Drinks.css"
import { RecentDrink } from "../drinks/RecentDrink"
import "./SubMenu.css"
import { DrinkFilterContainer } from "../drinks/DrinkFilterContainer"
import { DrinkSearchBar } from "../drinks/DrinkSearchBar"
import { useNavigate } from "react-router-dom"
import { fetchDrinkTypes, fetchPreferences, fetchRecentDrink } from "../../api/Api"

export const SubMenuView = ({
    drinkingNow,
    filter,
    setFilter,
    setFilterVariable,
    filterVariable,
    setShowAll,
    showAll,
    setSearchValue,
    location,
    setFilterByPreference,
    filterByPreference }) => {


    const navigate = useNavigate()
    //display preferences

    const currentUser = getCurrentUser()

    const displayDrinkTypes = async () => {
        let preferences = await fetchPreferences(currentUser)
        let drinkTypes = await fetchDrinkTypes()
        await setPreferences(preferences)
        await setDrinkTypes(drinkTypes)
    }

    const [drinkTypes, setDrinkTypes] = useState([])
    const [preferences, setPreferences] = useState([])
    const [filteredDrinkTypes, setFilteredDrinkTypes] = useState([])

    useEffect(
        () => {
            displayDrinkTypes()
        }, []
    )

    useEffect(
        () => {
            let drinkTypesCopy = drinkTypes.map(x => ({ ...x }))

            drinkTypesCopy = drinkTypesCopy.filter(
                x => !preferences
                    .find(y => y.type === x.type && y.preferenceTypeId === 2)
            )

            drinkTypesCopy = drinkTypesCopy.sort((a, b) => a.type.localeCompare(b.type))

            setFilteredDrinkTypes(drinkTypesCopy)

        }, [drinkTypes]
    )

    //get most recent drink

    const firebaseId = getCurrentUser().uid

    const displayRecentDrink = async () => {
        let recentDrink = await fetchRecentDrink(firebaseId)
        await setRecentDrink(recentDrink)
    }

    const [recentDrink, setRecentDrink] = useState({})

    useEffect(
        () => {
            displayRecentDrink()
        }, [drinkingNow]
    )

    // all button color

    useEffect(
        () => {
            if (location !== "userProfile"
                && location !== "friendProfile"
                && location !== "editProfile"
                && location !== "social") {
                showAll
                    ? document.getElementById(`optionAll`).classList.add("drink-filter-option-all-selected")
                    : document.getElementById(`optionAll`).classList.remove("drink-filter-option-all-selected")
            }

        }, [showAll]
    )

    return (
        <section className="sub-menu-view">

            <section className="drink-recent-activities">

                <RecentDrink
                    id={recentDrink.id}
                    name={recentDrink.name}
                    type={recentDrink.type}
                    timesTried={recentDrink.timesTried}
                    dateTime={recentDrink.dateTime}
                    image={recentDrink.image}
                    drinkingNow={drinkingNow}
                />

                {location === "userProfile"
                    || location === "editProfile"
                    || location === "friendProfile"
                    ?
                    <>
                        <div
                            className="userprofile-bttn"
                            onClick={
                                () => {
                                    navigate("/profile/edit")
                                }
                            }
                        >Edit Profile</div>
                        <div
                            className="userprofile-bttn"
                            onClick={
                                () => {
                                    navigate(`/profile/${currentUser.uid}`)
                                }
                            }
                        >Summary</div>
                    </>
                    : <></>}

                {location === "userProfile"
                    || location === "friendProfile"
                    || location === "editProfile"
                    || location === "social"
                    ? <></>
                    : <section className="drink-filter-container">
                        <DrinkFilterContainer
                            drinkTypes={filteredDrinkTypes}
                            setFilter={setFilter}
                            filter={filter}
                            setFilterVariable={setFilterVariable}
                            filterVariable={filterVariable}
                            setShowAll={setShowAll}
                            showAll={showAll}
                            setFilterByPreference={setFilterByPreference}
                            filterByPreference={filterByPreference} />
                    </section>}
                {location === "userProfile"
                    || location === "friendProfile"
                    || location === "editProfile"
                    ? <></>
                    :
                    <section
                        className="drink-searchbar">
                        <DrinkSearchBar
                            setSearchValue={setSearchValue}
                            location={location} />
                    </section>}

            </section>

        </section>
    )
}