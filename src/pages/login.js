import LoginPage from "../features/login"
import { IonCardContent } from "@ionic/react"
const PageLogin = () => {
  return (
    <IonCardContent className="auth-pop min-h-[100vh] grid place-content-center bg-white">
      <LoginPage />
    </IonCardContent>
  )
}
export default PageLogin
