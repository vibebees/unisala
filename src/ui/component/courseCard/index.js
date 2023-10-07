import React from "react"
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
  IonSkeletonText
} from "@ionic/react"
import {heart, saveOutline, location, shareOutline, schoolOutline} from "ionicons/icons"
import useGradeColor from "../../../hooks/useGradeColor"
import useGrade from "../../../hooks/useGrade"
import {universityDefaultImage} from "../../../servers/s3.configs"

function CardImage({allProps}) {
  const {images, pictures, recommended = true} = allProps

  return (
    <div className="card-image">
      <img
        src={pictures?.[0] || images?.[0] || universityDefaultImage}
        alt="University"
        style={{
          width: "250px",
          height: "200px",
          objectFit: "cover",
          margin: "auto"
        }}
      />
    </div>
  )
}

function CardActions({allProps}) {
  const {showSave = false, showShare = false} = allProps

  return (
    <div style={{display: "flex", gap: "10px"}}>
      {showShare && <IonIcon style={{fontSize: "25px"}} icon={shareOutline} />}
      {showSave && <IonIcon style={{fontSize: "25px"}} icon={saveOutline} />}
    </div>
  )
}

function Location({allProps}) {
  const {address = {}} = allProps
  const {city, stateAbbreviation, streetAddressOrPOBox} = address
  const formattedAddress = `${city}, ${stateAbbreviation}, ${streetAddressOrPOBox}`

  return (
    <IonItem className="ion-no-padding" >
      <IonIcon
        className="ion-icon text-primary"
        icon={location}
      />
      <IonLabel className="ion-padding-start">
        <IonText className="text-sm font-semibold text-gray-600">
          {formattedAddress}
        </IonText>
      </IonLabel>
    </IonItem>
  )
}

function LikeATag({colorTitle = "blue", colorValue = "yellow", title, value, skipBg = false}) {
  const titleColorClass = `text-${colorTitle}-500 font-bold`
  const valueColorClass = `bg-${colorValue}-400 text-white rounded-full px-2 py-1`

  return (
    <IonRow style={{marginTop: "20px"}}>
      <IonCardSubtitle className={titleColorClass}>
        <span className="mr-2">{title}</span>
        <span className={skipBg ? "" : valueColorClass}>
          {value}
        </span>
      </IonCardSubtitle>
    </IonRow>
  )

}

function Offerings({allProps}) {

  const {graduateOffering, undergraduateOffering} = allProps
  return (
    <IonItem>

      <IonRow>
        <IonIcon
          className="ion-icon"
          icon={schoolOutline}
          style={{color: "var(--ion-color-primary)", fontSize: "24px"}}
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

function Grade({allProps}) {
  const {average, width, showGrade} = allProps

  return (
    <div
      style={{
        background: useGradeColor(average),
        margin: "auto"
      }}
      className="card-report"
    >
      <h6 style={{fontSize: width > 800 ? "14px" : "12px", margin: "0"}}>
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
          <IonSkeletonText animated={true} style={{width: "80%"}}></IonSkeletonText>
        </h3>
        <p>
          <IonSkeletonText animated={true} style={{width: "60%"}}></IonSkeletonText>
        </p>
        <p>
          <IonSkeletonText animated={true} style={{width: "30%"}}></IonSkeletonText>
        </p>
      </IonLabel>
    </IonItem>
  )
}

function CourseCard({allProps}) {
  const {
    name,
    ownType,
    tags,
    loading = false
  } = allProps

  if (loading) {
    return loadingScreen()
  }

  return (
    <IonCard>
      <IonGrid>
        <IonRow>
          <IonCol style={{margin: "auto"}} size={"auto"}>
            <CardImage allProps={allProps} />
          </IonCol>
          <IonCol>
            <IonRow>
              <IonCol>
                <div style={{display: "flex", float: "right"}}>
                  <CardActions allProps={allProps} />
                </div>
                <IonText color="dark">
                  <IonCardTitle>{name}</IonCardTitle>
                </IonText>
                <Location allProps={allProps} />
                <Offerings allProps={allProps} />

                {ownType?.length > 0 && <LikeATag colorTitle="green" colorValue="yellow" title="Own Type:" value={ownType} />}
                {/* {tags?.map((tag, index) => <LikeATag colorTitle="blue" colorValue="yellow" title="Tags:" value={tag} key={index} />)} */}
                {tags?.length > 0 && <LikeATag colorTitle="blue" colorValue="blue" title="tags: " value={tags.join("#")} skipBg={true} />}

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
