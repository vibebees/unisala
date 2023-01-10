// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonAvatar } from "@ionic/react"

const DiscussionInput = () => {
    return (
        <div className="write-review">
            <IonAvatar id="ReviewImg_div">
                <img
                    style={{
                        width: "50px",
                        objectFit: "cover"
                    }}
                    id="ReviewImg"
                    src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                />
            </IonAvatar>
            <div style={{ width: "100%" }} id="ReviewText_div">
                <input
                    id="ReviewText"
                    type="text"
                    className="shadow-lg bg-rose-500 hover:bg-rose-700 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded"
                    placeholder="Write a review"
                />
            </div>
        </div>
    )
}
export default DiscussionInput
