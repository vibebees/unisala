import React, { useState } from "react"
import { IonImg, IonSkeletonText } from "@ionic/react"
import NoImageFound from "../../../assets/no_image_found.png"

const ImageWithLoader = ({ style, src, className, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  return (
    <>
      <div style={style} className="relative">
        <IonImg
          src={imageSrc}
          className={className}
          alt={alt}
          style={style}
          loading="lazy"
          onIonImgDidLoad={() => setImageLoaded(true)}
          onIonError={() => {
            setImageLoaded(true)
            setImageSrc(NoImageFound)
          }}
        />

        {!imageLoaded && (
          <div className=" absolute inset-0" style={style}>
            <IonSkeletonText
              animated={true}
              className="bg-neutral-300"
            ></IonSkeletonText>
          </div>
        )}
      </div>
    </>
  )
}

export default ImageWithLoader
