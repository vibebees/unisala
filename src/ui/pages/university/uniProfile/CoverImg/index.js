// eslint-disable-next-line no-use-before-define
import React from "react"
import "./CoverImg.css"

const CoverImg = () => {
    const [width, setWidth] = React.useState(window.innerWidth)
    const handleResize = () => {
        const { innerWidth } = window

        if (width !== innerWidth) {
            setWidth(innerWidth)
        }
    }
    React.useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })

    return (
        <div className="CoverImg">
            <div
                // style={{ height: "100%", overflow: "hidden" }}
                className="CoverImg_Div"
            >
                <a
                    target={"_blank"}
                    rel="noreferrer"
                    style={{
                        width: "100%"
                    }}
                    href="https://images.unsplash.com/20/cambridge.JPG?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=847&q=80"
                >
                    <img
                        style={{ transition: "0.3s" }}
                        src={
                            "https://images.unsplash.com/20/cambridge.JPG?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=847&q=80"
                        }
                        className="CoverImg_Img"
                        alt=""
                    />
                </a>
            </div>
            <div
                style={{
                    left: width > 720 ? "25px" : "0",
                    right: width < 720 && "0",
                    margin: "auto"
                }}
                id="ProfileImg_div"
            >
                <img
                    src={
                        "https://cdn.vox-cdn.com/thumbor/l5-CNuyDLr8IR8dWTW_7wqnT_bc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084622/5f1b1bd4b8800.image.jpg"
                    }
                    alt=""
                    id="ProfileImg_Img"
                />
            </div>
        </div>
    )
}
export default CoverImg
