// eslint-disable-next-line no-use-before-define
import React, { useState } from "react"
import AWS from "aws-sdk"

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

const ImageUpload = () => {
    const [progress, setProgress] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null)
    console.log(progress)

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const uploadFile = (file) => {
        const fName = file?.name?.splits(".")
        const params = {
            ACL: "public-read",
            Body: file,
            Bucket: S3_BUCKET,
            Key: fName[0] + Date.now() + "." + fName[1]
        }

        myBucket
            .putObject(params)
            .on("httpUploadProgress", (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err, data) => {
                if (err) console.log(err)
            })
    }

    return (
        <div>
            <div>Native SDK File Upload Progress is {progress}%</div>
            <input type="file" onChange={handleFileInput} />
            <button onClick={() => uploadFile(selectedFile)}>
                {" "}
                Upload to S3
            </button>
        </div>
    )
}

export default ImageUpload
