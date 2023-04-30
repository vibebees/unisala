import AWS from "aws-sdk"
export
    const awsBucket = (type) => {
        let
            S3_BUCKET = null,
            REGION = "us-east-1"
        switch (type) {
            case "user":
                S3_BUCKET = "unisala-user-images"
                REGION = "us-east-1"
                AWS?.config?.update({
                    accessKeyId: "AKIAUVJSKU37X3A6PCBA",
                    secretAccessKey: "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",
                    region: REGION
                })
                break
            case "uni":
                AWS?.config?.update({
                    accessKeyId: "AKIAUVJSKU37TPTUP4P7",
                    secretAccessKey: "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",
                    region: REGION
                })
                S3_BUCKET = "unisala-university-images"
                REGION = "us-east-1"
                break
            default:
                break
        }
        return new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION
        })

    },
    bucketName = (type) => {
        let S3_BUCKET = null
        switch (type) {
            case "user":
                S3_BUCKET = "unisala-user-images"
                break
            case "uni":
                S3_BUCKET = "unisala-university-images"
                break
            default:
                break
        }
        return S3_BUCKET
    },
    S3_BUCKET = "unisala-user-images",
    s3BucketUrl = `https://${S3_BUCKET}.s3.amazonaws.com`,
    imageAccess = `${s3BucketUrl}/`,
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
