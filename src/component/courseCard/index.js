import React, { useState } from "react"
import {
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
  IonCardTitle,
  IonSkeletonText,
  IonSlides,
  IonSlide,
  IonModal,
  IonButton,
  IonContent,
  IonImg
} from "@ionic/react"
import { saveOutline, shareOutline } from "ionicons/icons"
import { LikeATag } from "../tags"
import { universityDefaultImage } from "servers/s3.configs"
import Location from "./../../features/search/atoms/CardLocation"
import ApplicationCharges from "./../../features/search/atoms/ApplicationCharges"
import Offerings from "./../../features/search/atoms/Offerings"
import RatingCard from "./../../features/search/atoms/RatingCard"
import ImageWithLoader from "component/Reusable/Image/ImageWithLoader"

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
    display: "inline-flex",
    flexWrap: "nowrap"
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
    <div className="card-image - overflow-hidden mr-2">
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
            <ImageWithLoader
              key={index}
              src={picture || images?.[0] || universityDefaultImage}
              style={imageStyle}
              alt={`University Image ${index + 1}`}
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

function CourseCard({ allProps }) {
  const {
    name,
    ownType,
    tags,

    undergraduateApplicationFee,
    totalPeopleVoted,
    overallRating
  } = allProps

  return (
    <IonCard className="max-md:mx-0">
      <IonGrid>
        <IonRow>
          <IonCol
            style={{ margin: "auto" }}
            className="overflow-hidden "
            size={"auto"}
          >
            <CardImage allProps={allProps} />
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
                    <RatingCard
                      allProps={{ overallRating, totalPeopleVoted }}
                    />
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
