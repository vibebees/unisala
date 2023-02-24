import propTypes from "prop-types"
import { IonCardContent } from "@ionic/react"
import "./index.css"

function index(props) {
    const { title, subtitle, children } = props
    return (
        <IonCardContent className="center-text empty-state">
            <h1>{title}</h1>
            <p>{subtitle}</p>
            {children}
        </IonCardContent>
    )
}

index.propTypes = {
    title: propTypes.string,
    subtitle: propTypes.string
}

export default index
