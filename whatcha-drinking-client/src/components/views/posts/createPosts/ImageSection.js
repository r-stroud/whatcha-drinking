import { useState } from "react"

export const ImageSection = ({
    setPost,
    post,
    sectionConfirmed,
    setSectionConfirmed
}) => {

    const [selectedImage, setSelectedImage] = useState(null)

    const [image, setImage] = useState("")

    function updatePostImage() {
        let copy = post
        copy.image = image
        setPost(copy)
    }

    return (
        <fieldset className="create-post-section">

            <section>
                <div
                    className="create-post-number">
                    3
                </div>
            </section>

            <section>
                <label>Image<span>optional</span></label>
                <input
                    className="create-post-select-image"
                    type="file"
                    name="selectedImage"
                    onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                        setImage(event.target.files[0])
                    }}
                />

                <section
                    className="create-post-image-preview">


                    {selectedImage && (
                        <div>
                            <img
                                alt="not found"
                                src={URL.createObjectURL(selectedImage)}
                            />
                            <br />
                            <button
                                className="create-post-message-confirmation-bttn"
                                onClick={
                                    (e) => {
                                        e.preventDefault()
                                        // updatePostImage()
                                        setSectionConfirmed(sectionConfirmed === 2
                                            ? sectionConfirmed + 1
                                            : sectionConfirmed)


                                        document.getElementById("createPostImage")
                                            .style.left = "-100vw"
                                        document.getElementById("createPostImage")
                                            .style.width = "0%"
                                        document.getElementById(`createPostTitleImage`)
                                            .style.left = "0vw"

                                    }
                                }>
                                OK</button>
                        </div>
                    )}

                </section>

            </section>



        </fieldset>
    )
}