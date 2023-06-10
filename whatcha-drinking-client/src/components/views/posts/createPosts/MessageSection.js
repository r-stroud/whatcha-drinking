import { useEffect, useState } from "react"

export const MessageSection = ({
    setPost,
    post,
    sectionConfirmed,
    setSectionConfirmed,
    editDetails
}) => {

    // check message detials
    const [messageLength, setMessageLength] = useState(0)
    const [message, setMessage] = useState("")

    //update post

    function updatePostMessage() {
        let copy = post
        copy.message = message
        setPost(copy)
    }

    // display functions

    function messageDisplay() {
        document.getElementById("createPostMessage")
            .style.left = "-100vw"
        document.getElementById("createPostMessage")
            .style.width = "0%"
    }

    function imageDisplay() {

        document.getElementById("createPostMessage")
            .style.left = "-100vw"
        document.getElementById("createPostMessage")
            .style.width = "0%"

        setTimeout(
            () => {
                document.getElementById("createPostImage")
                    .style.left = "0vw"
                document.getElementById("createPostImage")
                    .style.width = "100%"
            }, 200
        )
    }

    useEffect(
        () => {

            document.getElementById("textarea").defaultValue = editDetails.message
        }, []
    )

    return (
        <fieldset className="create-post-section">

            <section>
                <div
                    className="create-post-number">
                    2
                </div>
            </section>

            <section>
                <label>Message</label>
                <textarea
                    id={`textarea`}
                    type="text"
                    className="create-post-textarea"
                    onChange={
                        (e) => {
                            setMessageLength(e.target.value.length)
                            setMessage(e.target.value)
                        }
                    }
                >

                </textarea>

                {
                    messageLength > 5
                        ? <div
                            className="create-post-message-confirmation-bttn"
                            onClick={
                                () => {
                                    updatePostMessage()
                                    setSectionConfirmed(sectionConfirmed === 1
                                        ? sectionConfirmed + 1
                                        : sectionConfirmed)

                                    document.getElementById(`createPostTitleMessage`)
                                        .style.left = "0vw"

                                    sectionConfirmed > 2
                                        ? messageDisplay()
                                        : imageDisplay()

                                }
                            }>OK</div>
                        : <div
                            className="create-post-message-warning">
                            Message must be greater than 5 characters</div>
                }

            </section>

        </fieldset>
    )
}