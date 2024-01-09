
let
  S3_BUCKET = null,
  REGION = "us-east-1",
  BASE_URL = ""

export const awsBucket = (type) => {},
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
  getImage = (type, Key = "default.jpg", setImageCallBack) => {

    // setImageCallBack(mainUrl)
    // const {userSeviceSignedUrl, uniSeviceSignedUrl} = useSelector((store) => store?.auth)

    // https://unisala-university-images.s3.us-east-1.amazonaws.com/
    // awsBucket(type).getObject({Key}, (err, data) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         const blob = new Blob([data.Body], {type: "image/jpeg"})
    //         const url = URL.createObjectURL(blob)
    //         setImageCallBack(url)
    //     }
    // })
  }

export const universityDefaultImage = "https://cdn.vox-cdn.com/thumbor/l5-CNuyDLr8IR8dWTW_7wqnT_bc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084622/5f1b1bd4b8800.image.jpg"
