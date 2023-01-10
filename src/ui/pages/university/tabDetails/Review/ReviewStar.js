// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonIcon } from "@ionic/react"
import { star, starOutline } from "ionicons/icons"

const ReviewStar = ({ index }) => {
    const [value, setValue] = React.useState(4)
    return (
        <>
            <IonIcon
                onClick={() => {
                    setValue(index + 1)
                }}
                style={{
                    color: "#F8B64C",
                    margin: "0 3px",
                    padding: "0",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
                icon={value >= index + 1 ? star : starOutline}
            />
        </>
    )
}
export default ReviewStar
