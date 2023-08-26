import { useQuery } from "@apollo/client"
import {
  IonCard,
  IonText,
  IonCol,
  IonItem,
  IonAvatar,
  IonLabel
} from "@ionic/react"
import { Link } from "react-router-dom"
import CreateSpace from "../../component/createSpace/CreateSpace"

export const screenGreaterThan1000 = ({ title, topSpaces }) => {
  return (
    <>
      <IonCol
        size="auto"
        style={{
          maxWidth: "250px",
          height: "90vh",
          position: "sticky",
          top: "5px",
          overflow: "auto"
        }}
      >
        {title === "Top Spaces" && <CreateSpace />}
        <IonCard className="">
          <IonText color="dark">
            <h6 className="text-center my-2 font-semibold"> {title}</h6>
          </IonText>

          {Array.isArray(topSpaces) &&
            topSpaces.map((item, index) => {
              return (
                <Link to={"/space/" + item?.name} className="" key={index}>
                  <IonItem
                    className="max-w-[250px]"
                    fill="solid"
                    style={{
                      "--background": "white",
                      "--background-hover": "#eee"
                    }}
                    key={index}
                  >
                    <IonAvatar slot="start">
                      <img
                        src={
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Desktop_computer_clipart_-_Yellow_theme.svg/2000px-Desktop_computer_clipart_-_Yellow_theme.svg.png"
                        }
                      />
                    </IonAvatar>
                    <IonLabel className="ion-text-wrap">
                      <h2 className="capitalize">{item.name}</h2>
                      <p
                        style={{
                          margin: 0
                        }}
                      >
                        {item?.location}
                      </p>
                    </IonLabel>
                  </IonItem>
                </Link>
              )
            })}
        </IonCard>
      </IonCol>
    </>
  )
}
