import React, { useState } from "react"
import { IonImg, IonSkeletonText } from "@ionic/react"

const ImageWithLoader = ({ style, src, className, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <>
      <div style={style} className="relative">
        <IonImg
          src={src}
          className={className}
          alt={alt}
          style={style}
          onIonImgDidLoad={() => setImageLoaded(true)}
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
