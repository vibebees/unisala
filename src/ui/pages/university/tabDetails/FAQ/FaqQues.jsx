// eslint-disable-next-line no-use-before-define
import React, { useState, useRef } from "react"
import { IonText } from "@ionic/react"

const FaqQuestion = ({ answer, question, index, faqs }) => {
    const [activeFaq, setActiveFaq] = useState("")
    const [height, setHeight] = useState(0)
    const answerRef = useRef(null)
    const questionRef = useRef(null)

    const handleChangeActiveFaq = (index) => {
        if (index !== activeFaq) {
            setActiveFaq(index)
            setHeight(answerRef.current.scrollHeight)
            // questionRef.current.style.height = `${answerRef.current.scrollHeight}px`
        } else {
            setActiveFaq("")
            questionRef.current.style.height = `${0}px`
        }
    }
    return (
        <div
            key={index}
            style={{
                backgroundColor: "#fff",
                borderBottom: `${
                    faqs.length - 1 > index
                        ? "1px solid rgb(209,213,219,1)"
                        : ""
                }`
            }}
        >
            <div
                style={{ transition: " 0.3s ease-in-out" }}
                className={`faqsMapDataDiv  hover:bg-gray-200 ${
                    activeFaq === index ? "bg-gray-200 " : "white"
                }`}
                onClick={(e) => handleChangeActiveFaq(index, e)}
            >
                <IonText color="dark">
                    <h6
                        style={{
                            margin: "0"
                        }}
                    >
                        Q. {question}
                    </h6>
                </IonText>

                <div>
                    {activeFaq === index && (
                        <svg
                            fill="#3880ff"
                            viewBox="0 0 512 512"
                            style={{
                                width: "20px",
                                height: "20px"
                            }}
                        >
                            <path d="m256 512c-68.378906 0-132.667969-26.628906-181.019531-74.980469-48.351563-48.351562-74.980469-112.640625-74.980469-181.019531s26.628906-132.667969 74.980469-181.019531c48.351562-48.351563 112.640625-74.980469 181.019531-74.980469s132.667969 26.628906 181.019531 74.980469c48.351563 48.351562 74.980469 112.640625 74.980469 181.019531s-26.628906 132.667969-74.980469 181.019531c-48.351562 48.351563-112.640625 74.980469-181.019531 74.980469zm0-472c-119.101562 0-216 96.898438-216 216s96.898438 216 216 216 216-96.898438 216-216-96.898438-216-216-216zm110 195.980469h-220v40h220zm0 0" />
                        </svg>
                    )}
                    {activeFaq !== index && (
                        <svg
                            fill="#3880ff"
                            viewBox="0 0 512 512"
                            style={{
                                width: "20px",
                                height: "20px"
                            }}
                        >
                            <g>
                                <g>
                                    <path
                                        d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.853,256-256S397.167,0,256,0z M256,472.341
                       c-119.275,0-216.341-97.046-216.341-216.341S136.725,39.659,256,39.659S472.341,136.705,472.341,256S375.295,472.341,256,472.341z
                       "
                                    />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M355.148,234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83,8.884-19.83,19.83v79.318h-79.318
                       c-10.966,0-19.83,8.884-19.83,19.83s8.864,19.83,19.83,19.83h79.318v79.318c0,10.946,8.864,19.83,19.83,19.83
                       s19.83-8.884,19.83-19.83v-79.318h79.318c10.966,0,19.83-8.884,19.83-19.83S366.114,234.386,355.148,234.386z"
                                    />
                                </g>
                            </g>
                        </svg>
                    )}
                </div>
            </div>
            <div
                ref={questionRef}
                style={{
                    height: activeFaq === index ? `${height}px` : `${0}px`,
                    overflow: "hidden",
                    transition: " 0.3s ease-in-out"
                }}
            >
                <div ref={answerRef} className={"faqsMapDataAnswer"}>
                    <p>{answer}</p>
                </div>
            </div>
        </div>
    )
}
export default FaqQuestion
