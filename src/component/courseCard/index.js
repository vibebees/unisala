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
  schoolOutline,
  cashOutline,
  star,
  starHalf
} from "ionicons/icons"
import useGrade from "hooks/useGrade"

import { LikeATag } from "../tags"
import { universityDefaultImage } from "servers/s3.configs"
import useGradeColor from "hooks/useGradeColor"

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
          {pictures?.map((picture, index) => (
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
    <IonRow
      className="ion-no-padding gap-1 items-center h-fit mt-2"
      lines="none"
    >
      <IonIcon
        className="ion-icon leading-none mt-0 text-primar text-lg"
        icon={location}
      />
      <IonText className="text-sm leading-none m-0 h-fit ion-no-padding font-semibold text-gray-600">
        {formattedAddress}
      </IonText>
    </IonRow>
  )
}
function ApplicationCharges({ undergraduateApplicationFee = null }) {
  if (undergraduateApplicationFee === null) return null
  return (
    <IonRow className="ion-no-padding pl-1 mt-1">
      <IonIcon className="ion-icon text-primar text-lg" icon={cashOutline} />
      <IonLabel className="pl-2">
        <IonText className="text-sm font-semibold text-gray-600">
          Application Charges : ${undergraduateApplicationFee}
        </IonText>
      </IonLabel>
    </IonRow>
  )
}

function Offerings({ allProps }) {
  const { graduateOffering, undergraduateOffering } = allProps
  return (
    <IonRow className="ion-no-padding pl-1 mt-2 h-fit ">
      <IonRow className="ion-no-padding justify-start h-fit">
        <IonIcon
          className="ion-icon text-primar text-lg"
          icon={schoolOutline}
        />
        {graduateOffering && (
          <IonCol size="auto" className="ion-no-padding ml-2 w-fit p-0 h-fit">
            <IonLabel className="ion-padding-start p-0 font-semibold  text-red-500">
              {graduateOffering.substring(0, 30)}
            </IonLabel>
          </IonCol>
        )}

        {undergraduateOffering && (
          <IonCol size="auto" className="ion-no-padding h-fit ">
            <IonLabel className="ion-padding-start  font-bold text-blue-500">
              {undergraduateOffering.substring(0, 35)} 📚
            </IonLabel>
          </IonCol>
        )}
      </IonRow>
    </IonRow>
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

export function LoadingScreen() {
  return (
    <IonCard>
      <IonGrid>
        <IonRow>
          <IonCol style={{ margin: "auto" }} size={"auto"}>
            <IonSkeletonText
              animated={true}
              style={{ width: "80%" }}
            ></IonSkeletonText>
          </IonCol>
          <IonCol>
            <IonRow>
              <IonCol>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "80%" }}
                ></IonSkeletonText>
                <IonText color="dark">
                  <IonSkeletonText
                    animated={true}
                    style={{ width: "80%" }}
                  ></IonSkeletonText>
                </IonText>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "80%" }}
                ></IonSkeletonText>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "80%" }}
                ></IonSkeletonText>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "80%" }}
                ></IonSkeletonText>
                {/* {tags?.map((tag, index) => <LikeATag colorTitle="blue" colorValue="yellow" title="Tags:" value={tag} key={index} />)} */}
                <IonSkeletonText
                  animated={true}
                  style={{ width: "80%" }}
                ></IonSkeletonText>

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

export function RatingCard({ allProps }) {
  const { average, width, showGrade } = allProps

  return (
    <IonRow className=" justify-end items-start  m-0 h-fit">
      <IonCol size="auto m-0">
        <IonRow className="items-center m-0">
          <IonText className="text-2xl m-0 font-semibold text-neutral-900">
            4.5
          </IonText>
          <IonCol className="items-end flex mt-1  gap-1 py-px px-2  h-fit ion-no-padding">
            <IonIcon
              style={{ fontSize: "18px" }}
              icon={star}
              className="text-yellow-500"
            />

            <IonIcon
              style={{ fontSize: "18px" }}
              icon={star}
              className="text-yellow-500"
            />

            <IonIcon
              style={{ fontSize: "18px" }}
              icon={star}
              className="text-yellow-500"
            />

            <IonIcon
              style={{ fontSize: "18px" }}
              icon={star}
              className="text-yellow-500"
            />

            <IonIcon
              style={{ fontSize: "18px" }}
              icon={starHalf}
              className="text-yellow-500"
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonText>
            <IonCardSubtitle className="text-sm font-semibold text-gray-600">
              1,000 Reviews
            </IonCardSubtitle>
          </IonText>
        </IonRow>
      </IonCol>
    </IonRow>
  )
}

function CourseCard({ allProps }) {
  const {
    name,
    ownType,
    tags,
    loading,
    schoolDataLoading,
    undergraduateApplicationFee
  } = allProps

  return (
    <IonCard>
      <IonGrid>
        <IonRow>
          <IonCol style={{ margin: "auto" }} size={"auto"}>
            {/* <CardImage allProps={allProps} /> */}
          </IonCol>
          <IonCol>
            <IonRow>
              <IonCol>
                <IonRow className="ion-no-padding m-0  items-center  h-fit">
                  <IonCol size="auto h-fit">
                    <div style={{ display: "flex", float: "right" }}>
                      <CardActions allProps={allProps} />
                    </div>
                    <IonText color="dark">
                      <IonCardTitle>{name}</IonCardTitle>
                    </IonText>
                    <Location allProps={allProps} />
                  </IonCol>
                  <IonCol className="h-fit">
                    <RatingCard allProps={allProps} />
                  </IonCol>
                </IonRow>
                <Offerings allProps={allProps} />
                <ApplicationCharges
                  undergraduateApplicationFee={undergraduateApplicationFee}
                />

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
