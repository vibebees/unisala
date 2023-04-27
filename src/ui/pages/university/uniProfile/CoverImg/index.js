// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react"
import { awsBucket, bucketName, getImageUrl } from "../../../../../servers/s3.configs"
import "./CoverImg.css"

export const CoverImg = (props) => {
    const [width, setWidth] = React.useState(window.innerWidth)
    const [coverImage, setCoverImage] = useState("default.jpg")
    const [profileImage, setProfileImage] = useState("default2.jpg")

    const [images, setImages] = React.useState(props?.images || [])
    const handleResize = () => {
        const { innerWidth } = window

        if (width !== innerWidth) {
            setWidth(innerWidth)
        }
    },
    getImage = (type, Key = "default.jpg", setImageCallBack) => {
        awsBucket(type).getObject({ Key }, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            const blob = new Blob([data.Body], { type: "image/jpeg" })
            const url = URL.createObjectURL(blob)
            setImageCallBack(url)
          }
        })
      }

    useEffect(() => {
        getImage("uni", images?.[0] || coverImage, setCoverImage)
        getImage("uni", images?.[1] || profileImage, setProfileImage)
      }, [images])

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })

    return (
        <div className="CoverImg">
            <div
                // style={{ height: "100%", overflow: "hidden" }}
                className="CoverImg_Div"
            >
                <a
                    target={"_blank"}
                    rel="noreferrer"
                    style={{
                        width: "100%"
                    }}
                    href={coverImage}
                >
                    <img
                        style={{ transition: "0.3s" }}
                        src={coverImage}
                        className="CoverImg_Img"
                        alt=""
                    />
                </a>
            </div>
            <div
                style={{
                    left: width > 720 ? "25px" : "0",
                    right: width < 720 && "0",
                    margin: "auto"
                }}
                id="ProfileImg_div"
            >
                <img
                    src={profileImage }
                    alt=""
                    id="ProfileImg_Img"
                />
            </div>
        </div>
    )
}
