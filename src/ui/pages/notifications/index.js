import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent
} from "@ionic/react"
import useWindowWidth from "../../../hooks/useWindowWidth"
import TopUniversitySidebar from "../../component/TopUniversitySidebar"
import "./index.css"

const ProfilePage = () => {
  let windowWidth = useWindowWidth()

  return (
    <IonContent>
      <IonGrid className="max-width-container">
        <IonRow>
          <IonCol>
            <IonCard className="mb-1">
              <IonCardContent>
                <h2>Notifications</h2>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardContent>
                <div className="notificatons-tabs-content">
                  Hi 👋, Chaman Bravo. <br /> <br />
                  Welcome to Unisala -- The perfect place truly helps in finding
                  the perfect university for you.
                  <br />
                  <br /> Here is some information to help you get started with
                  Unisala.
                  <br />
                  <br /> How does it work?
                  <br /> lorem ipsum....
                  <br />
                  <br />
                  Quick
                  <br /> ✍️ Ask your queries
                  <br /> 📃 Read stories from your personalized feed
                  <br /> 😎 Keep your profile up-to-date
                  <br /> 🚔 Code of Conduct
                  <br />
                  <br /> We share the best articles on Twitter and LinkedIn.
                  Follow us to stay updated
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
          {windowWidth >= 1080 && (
            <IonCol className="sidebar">
              <TopUniversitySidebar />
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}

export default ProfilePage
