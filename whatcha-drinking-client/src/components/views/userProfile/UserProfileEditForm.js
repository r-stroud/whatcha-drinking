import { Dog1, Dog2, Liz1, Liz2, Cat1, Cat2, Bird1, Bird2, getCurrentUser } from "../../utils/Constants";

export const UserProfileEditForm = ({
    updateSelectedIcon,
    hideSelection,
    setCancelPic,
    cancelPic
}) => {

    return (
        <section className="userprofile-edit-form">
            <form id="userprofileEditPicForm" >
                <div className="userprofile-edit-pic-header">Please select a profile picture</div>
                <section className="flex-start"
                >
                    <fieldset className="flex-start">

                        <input
                            type="radio"
                            id="whiskeyDog1"
                            className="icon-selection"
                            name="profile-pic"
                            value={Dog1}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyDog1">
                            <img
                                className="user-icon"
                                src={Dog1} />
                        </label>

                        <input
                            type="radio"
                            id="whiskeyDog2"
                            className="icon-selection"
                            name="profile-pic"
                            value={Dog2}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyDog2">
                            <img
                                className="user-icon"
                                src={Dog2} />
                        </label>

                        <input
                            type="radio"
                            id="whiskeyLiz1"
                            className="icon-selection"
                            name="profile-pic"
                            value={Liz1}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyLiz1">
                            <img
                                className="user-icon"
                                src={Liz1} />
                        </label>

                        <input
                            type="radio"
                            id="whiskeyLiz2"
                            className="icon-selection"
                            name="profile-pic"
                            value={Liz2}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyLiz2">
                            <img
                                className="user-icon"
                                src={Liz2} />
                        </label>

                        <input
                            type="radio"
                            id="whiskeyCat1"
                            className="icon-selection"
                            name="profile-pic"
                            value={Cat1}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyCat1">
                            <img
                                className="user-icon"
                                src={Cat1} />
                        </label>

                        <input
                            type="radio"
                            id="whiskeyCat2"
                            className="icon-selection"
                            name="profile-pic"
                            value={Cat2}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyCat2">
                            <img
                                className="user-icon"
                                src={Cat2} />
                        </label>

                        <input
                            type="radio"
                            id="whiskeyBird1"
                            className="icon-selection"
                            name="profile-pic"
                            value={Bird1}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyBird1">
                            <img
                                className="user-icon"
                                src={Bird1} />
                        </label>

                        <input
                            type="radio"
                            id="whiskeyBird2"
                            className="icon-selection"
                            name="profile-pic"
                            value={Bird2}
                            onClick={updateSelectedIcon}
                        />
                        <label htmlFor="whiskeyBird2">
                            <img
                                className="user-icon"
                                src={Bird2} />
                        </label>

                    </fieldset>
                    <section className="userprofile-edit-bttn-container">
                        <div
                            className="userprofile-edit-names-ok-bttn"
                            onClick={
                                () => {
                                    hideSelection()
                                }
                            }>OK</div>
                        <div
                            className="userprofile-edit-names-cancel-bttn"
                            onClick={
                                () => {
                                    hideSelection()
                                    setCancelPic(!cancelPic)

                                }
                            }>CANCEL</div>
                    </section>
                </section>
            </form>

        </section>
    )
}