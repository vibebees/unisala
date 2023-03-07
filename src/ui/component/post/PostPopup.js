// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import {
    IonAvatar,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonModal,
    IonText
} from "@ionic/react"
import AWS from "aws-sdk"
import { imageOutline } from "ionicons/icons"
import { AddPost } from "../../../graphql/user"
import TextChecker from "../../../utils/components/TextChecker"
import "./index.css"
import { USER_SERVICE_GQL } from "../../../servers/types"

 const S3_BUCKET = "uni-sala"
const REGION = "us-west-2"

AWS.config.update({
    accessKeyId: "AKIAZ6I45TER3Z53WMUW",
    secretAccessKey: "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"
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION
})

export const PostPopup = ({ setPopup, popup }) => {
    const [setProgress] = useState(0)
    const imgfile = React.useRef()
    const [postText, setPostText] = React.useState("")

    const [file, setfile] = React.useState("")
    const [fileData, setFileData] = React.useState("")
    const [fileName, setFileName] = React.useState("")

    const [addPost] = useMutation(AddPost, { context: { server: USER_SERVICE_GQL } })
    const handleChangeImage = (e) => {
        e.preventDefault()
        const file = imgfile?.current?.files[0]
        setFileData(file)
        const reader = new FileReader()

        reader.onloadend = () => {
            setfile(reader.result)
        }
        if (file) {
            reader.readAsDataURL(file)
            setfile(reader.result)
        } else {
            setfile("")
        }
    }
    const handleImageDrop = (e) => {
        e.preventDefault()
        const file = e?.dataTransfer?.files[0]
        setFileData(file)
        const reader = new FileReader()

        reader.onloadend = () => {
            setfile(reader.result)
        }
        if (file) {
            reader.readAsDataURL(file)
            setfile(reader.result)
        } else {
            setfile("")
        }
    }
    const fileUpdate = async (fileData, postImage) => {
        const fName = fileData?.name?.split(".")
        postImage = fName[0] + Date.now() + "." + fName[1]
        setFileName(postImage)

        const params = {
            ACL: "public-read",
            Body: fileData,
            Bucket: S3_BUCKET,
            Key: fName[0] + Date.now() + "." + fName[1]
        }

        await myBucket
            .putObject(params)
            .on("httpUploadProgress", (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err, data) => {
                if (err) console.log(err)
                if (data) console.log(data)
            })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        var postImage = null
        fileData && file && (await fileUpdate(fileData, postImage))
        addPost({
            variables: {
                postText: TextChecker(postText),
                postImage: fileName
            }
        })
        setPopup(false)
    }

    return (
        <IonModal
            className="post-popup"
            onDidDismiss={() => setPopup(false)}
            isOpen={popup}
        >
            <form onSubmit={handleSubmit}>
                <IonText className="post-title">
                    <h3>Start thread</h3>
                </IonText>

                <div className="post-preview">
                    <IonItem className="ion-no-padding" lines="none">
                        <IonAvatar>
                            <img
                                src={
                                    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1670164432~exp=1670165032~hmac=36b9b40ac0ed5b3a668c8bd6a3773cb706f13b46413881b4a4f1079241cb9eb5"
                                }
                            />
                        </IonAvatar>
                        <IonLabel className="ion-padding-start">
                            <h2>Nabin Kharel</h2>
                            <p>24 jun 2022</p>
                        </IonLabel>
                    </IonItem>
                    <IonText color="dark">
                        <textarea
                            className="post-textarea"
                            placeholder="Write something..."
                            onChange={(e) => setPostText(e.target.value)}
                        />
                    </IonText>

                    {file ? (
                        <img src={file} className="post-image-preview" />
                    ) : (
                        <div>
                            <label
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleImageDrop}
                                htmlFor="post-image"
                                className="post-image-drop"
                            >
                                <IonIcon icon={imageOutline} />
                            </label>
                            <input
                                type="file"
                                ref={imgfile}
                                hidden
                                onChange={handleChangeImage}
                                id="post-image"
                            />
                        </div>
                    )}
                </div>

                <IonButton
                    className="post-pop-button"
                    type="submit"
                    expand="full"
                    shape="round"
                >
                    Post
                </IonButton>
            </form>

            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <img
                src="https://media.istockphoto.com/photos/happy-graduate-student-holding-his-diploma-on-graduation-day-picture-id1349302576?b=1&k=20&m=1349302576&s=170667a&w=0&h=tMwYOgswPIXvUSgXSa99njp3akVEwTZX6Xuo8-HeYHw="
                alt=""
            /> */}
        </IonModal>
    )
}
export default PostPopup
