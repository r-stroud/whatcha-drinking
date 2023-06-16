import "./Posts.css"
import { DrinkImgs, getCurrentUser } from "../../utils/Constants"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PostsUserPreview } from "./PostsUserPreview"

export const Posts = ({
    id,
    userId,
    username,
    userFirstName,
    userLastName,
    userPic,
    drinkId,
    drinkName,
    drinkPic,
    drinkType,
    dateTime,
    picture,
    message,
    setRefresh,
    refresh,
    setUserPreview,
    setUserPreivewId

}) => {

    //navigate

    const navigate = useNavigate()

    //match drink image src
    let imageSrc = DrinkImgs.find(x => x.name === drinkPic)

    //current user

    const currentUser = getCurrentUser()

    // delete post

    const deletePost = async (id) => {
        const fetchData = await fetch(`https://localhost:7189/api/Post/remove_post/${id}`,
            { method: "DELETE" })

        await setRefresh(!refresh)

    }

    const [confirmDelete, setConfirmDelete] = useState(false)

    let postDate = new Date(dateTime);


    return (
        <>
            <section
                className="post">

                <section
                    className="post-drink-img">

                    <img
                        src={imageSrc.src} />

                </section>

                <section
                    className="post-header">

                    <img
                        src={userPic}
                        onClick={
                            () => {
                                setUserPreview(true)
                                setUserPreivewId(userId)
                            }
                        }
                    />
                    <section>
                        <div
                            className="post-username" >{username}
                        </div>
                        <div
                            className="post-fullname">
                            {`${userFirstName} ${userLastName}`}
                        </div>
                        <div
                            className="post-datetime">
                            {`${postDate.toLocaleDateString()} ${postDate.toLocaleTimeString()}`}
                        </div>
                    </section>

                </section>

                {confirmDelete
                    ?
                    <section className="post-delete-confirmation">
                        <div
                            className="post-delete-confirmation-header">
                            Are you sure you want to <span>delete</span>?</div>
                        <section>
                            <div
                                className="post-delete"
                                onClick={
                                    () => {
                                        deletePost(id)
                                    }
                                }
                            >Delete</div>
                            <div
                                className="post-edit"
                                onClick={
                                    () => {
                                        setConfirmDelete(false)
                                    }
                                }>Cancel</div>
                        </section>
                    </section>

                    : <>
                        <section
                            className="post-drink-info">
                            <div>
                                {drinkName}
                                <span>{drinkType}</span>
                            </div>
                        </section>

                        <section
                            className="post-message">

                            <div>
                                {message}
                            </div>
                        </section>

                        <section
                            className="post-edit-delete-bttns">
                            {currentUser.uid === userId
                                ? <>
                                    <div
                                        className="post-edit"
                                        onClick={
                                            () => {
                                                navigate(`/edit-post/${id}`)
                                            }
                                        }>Edit</div>
                                    <div
                                        className="post-delete"
                                        onClick={
                                            () => {
                                                setConfirmDelete(true)
                                            }
                                        }>Delete</div>
                                </>
                                : <></>}

                        </section>
                    </>
                }
            </section>
        </>
    )
}