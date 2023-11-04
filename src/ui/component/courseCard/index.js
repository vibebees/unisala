import React, { useState } from "react"
import {
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
  IonItem,
  IonLabel,
  IonCardSubtitle,
  IonCardTitle,
  IonThumbnail,
  IonSkeletonText,
  IonSlides,
  IonSlide,
  IonModal,
  IonButton,
  IonContent,
  IonImg
} from "@ionic/react"
import {
  heart,
  saveOutline,
  location,
  shareOutline,
  schoolOutline
} from "ionicons/icons"
import useGradeColor from "../../../hooks/useGradeColor"
import useGrade from "../../../hooks/useGrade"
import { universityDefaultImage } from "../../../servers/s3.configs"
import { LikeATag } from "../tags"

function ImageModal({ isOpen, imageSrc, onClose }) {
  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <IonButton onClick={onClose}>Close</IonButton>
        <IonImg src={imageSrc} alt="Selected Image" />
      </IonContent>
    </IonModal>
  )
}

function CardImage({ allProps }) {
  const {
    images,
    pictures = [],
    recommended = true,
    onSearch = false
  } = allProps

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")

  const imageContainerStyle = {
    display: "flex",
    flexWrap: "wrap"
  }
  const imageStyle = {
    width: "150px",
    height: "120px",
    objectFit: "cover",
    margin: "4px",
    cursor: "pointer" // Add a pointer cursor to indicate clickable images
  }
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc)
    setModalOpen(true)
  }
  return (
    <div className="card-image">
      {onSearch ? (
        <IonSlides
          options={{
            autoplay: true,
            loop: true,
            speed: 3000
          }}
        >
          {pictures?.map((picture, index) => (
            <IonSlide key={index}>
              <IonImg
                src={picture || images?.[0] || universityDefaultImage}
                alt={`University Image ${index + 1}`}
                style={imageStyle}
              />
            </IonSlide>
          ))}
        </IonSlides>
      ) : (
        <div style={imageContainerStyle}>
          {pictures.map((picture, index) => (
            <IonImg
              key={index}
              src={picture || images?.[0] || universityDefaultImage}
              alt={`University Image ${index + 1}`}
              style={imageStyle}
              onClick={() => handleImageClick(picture)}
            />
          ))}
        </div>
      )}

      {/* Render the ImageModal component */}
      <ImageModal
        isOpen={modalOpen}
        imageSrc={selectedImage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}

function CardActions({ allProps }) {
  const { showSave = false, showShare = false } = allProps

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {showShare && (
        <IonIcon style={{ fontSize: "25px" }} icon={shareOutline} />
      )}
      {showSave && <IonIcon style={{ fontSize: "25px" }} icon={saveOutline} />}
    </div>
  )
}

function Location({ allProps }) {
  const { address = {} } = allProps
  const { city, stateAbbreviation, streetAddressOrPOBox } = address || {}
  const formattedAddress = `${city}, ${stateAbbreviation}, ${streetAddressOrPOBox}`

  return (
    <IonItem className="ion-no-padding">
      <IonIcon className="ion-icon text-primary" icon={location} />
      <IonLabel className="ion-padding-start">
        <IonText className="text-sm font-semibold text-gray-600">
          {formattedAddress}
        </IonText>
      </IonLabel>
    </IonItem>
  )
}

function Offerings({ allProps }) {
  const { graduateOffering, undergraduateOffering } = allProps
  return (
    <IonItem>
      <IonRow>
        <IonIcon
          className="ion-icon"
          icon={schoolOutline}
          style={{ color: "var(--ion-color-primary)", fontSize: "24px" }}
        />
        {graduateOffering && (
          <IonCol className="ion-no-padding ">
            <IonLabel className="ion-padding-start font-semibold  text-red-500">
              {graduateOffering.substring(0, 30)}
            </IonLabel>
          </IonCol>
        )}

        {undergraduateOffering && (
          <IonCol className="ion-no-padding ">
            <IonLabel className="ion-padding-start font-semibold  font-bold text-blue-500">
              {undergraduateOffering.substring(0, 35)} 📚
            </IonLabel>
          </IonCol>
        )}
      </IonRow>
    </IonItem>
  )
}

function Grade({ allProps }) {
  const { average, width, showGrade } = allProps

  return (
    <div
      style={{
        background: useGradeColor(average),
        margin: "auto"
      }}
      className="card-report"
    >
      <h6 style={{ fontSize: width > 800 ? "14px" : "12px", margin: "0" }}>
        {useGrade(average)}
      </h6>
    </div>
  )
}

function loadingScreen() {
  return (
    <IonItem>
      <IonThumbnail slot="start">
        <IonSkeletonText animated={true}></IonSkeletonText>
      </IonThumbnail>
      <IonLabel>
        <h3>
          <IonSkeletonText
            animated={true}
            style={{ width: "80%" }}
          ></IonSkeletonText>
        </h3>
        <p>
          <IonSkeletonText
            animated={true}
            style={{ width: "60%" }}
          ></IonSkeletonText>
        </p>
        <p>
          <IonSkeletonText
            animated={true}
            style={{ width: "30%" }}
          ></IonSkeletonText>
        </p>
      </IonLabel>
    </IonItem>
  )
}

function CourseCard({ allProps }) {
  const { name, ownType, tags, loading = false, schoolDataLoading } = allProps
  console.log({ courseCard: allProps })
  if (loading || schoolDataLoading || name === undefined) {
    return loadingScreen()
  }

  return (
    <IonCard>
      <IonGrid>
        <IonRow>
          <IonCol style={{ margin: "auto" }} size={"auto"}>
            <CardImage allProps={allProps} />
          </IonCol>
          <IonCol>
            <IonRow>
              <IonCol>
                <div style={{ display: "flex", float: "right" }}>
                  <CardActions allProps={allProps} />
                </div>
                <IonText color="dark">
                  <IonCardTitle>{name}</IonCardTitle>
                </IonText>
                <Location allProps={allProps} />
                <Offerings allProps={allProps} />

                {ownType?.length > 0 && (
                  <LikeATag
                    colorTitle="green"
                    colorValue="yellow"
                    title="Own Type:"
                    value={ownType}
                  />
                )}
                {/* {tags?.map((tag, index) => <LikeATag colorTitle="blue" colorValue="yellow" title="Tags:" value={tag} key={index} />)} */}
                {tags?.length > 0 && (
                  <LikeATag
                    colorTitle="blue"
                    colorValue="blue"
                    title="tags: "
                    value={tags.join("#")}
                    skipBg={true}
                  />
                )}

                {/* <IonRow>
                  <IonCol>
                    <h4>Mission Statement:</h4>
                    <p>{missionStatement}</p>
                  </IonCol>
                </IonRow> */}
                {/* Other columns go here */}
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  )
}

export default CourseCard

