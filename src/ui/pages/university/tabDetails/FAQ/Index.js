// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react"
import { IonCard, IonCardContent } from "@ionic/react"

import "./faq.css"
import FaqQuestion from "./FaqQues"

const FAQ = () => {
    const [faqs, setFaqs] = useState([])
    useEffect(() => {
        setFaqs([
            {
                id: 1,
                question: "How can i trade stocks with a commission?",
                answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, obcaecati quo ipsum omnis reiciendis aut blanditiis aliquam, architecto harum a molestiae dolore nesciunt ad, id error quam! Ut, repellendus atque. Libero placeat eveniet doloremque vitae quos eaque dolore! Blanditiis, suscipit!"
            },
            {
                id: 2,
                question: "What should a beginner invest in?",
                answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, obcaecati quo ipsum omnis reiciendis aut blanditiis aliquam, architecto harum a molestiae dolore nesciunt ad, id error quam! Ut, repellendus atque. Libero placeat eveniet doloremque vitae quos eaque dolore! Blanditiis, suscipit!"
            },
            {
                id: 3,
                question: "How do I open a invest Account?",
                answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, obcaecati quo ipsum omnis reiciendis aut blanditiis aliquam, architecto harum a molestiae dolore nesciunt ad, id error quam! Ut, repellendus atque. Libero placeat eveniet doloremque vitae quos eaque dolore! Blanditiis, suscipit!"
            },
            {
                id: 4,
                question:
                    "Am I able to buy a part of a share rather than a whole?",
                answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, obcaecati quo ipsum omnis reiciendis aut blanditiis aliquam, architecto harum a molestiae dolore nesciunt ad, id error quam! Ut, repellendus atque. Libero placeat eveniet doloremque vitae quos eaque dolore! Blanditiis, suscipit!"
            },
            {
                id: 5,
                question: "Can i Buy my own stocks?",
                answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, obcaecati quo ipsum omnis reiciendis aut blanditiis aliquam, architecto harum a molestiae dolore nesciunt ad, id error quam! Ut, repellendus atque. Libero placeat eveniet doloremque vitae quos eaque dolore! Blanditiis, suscipit!"
            },
            {
                id: 6,
                question: "Is there an account minimum to start investing?",
                answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, obcaecati quo ipsum omnis reiciendis aut blanditiis aliquam, architecto harum a molestiae dolore nesciunt ad, id error quam! Ut, repellendus atque. Libero placeat eveniet doloremque vitae quos eaque dolore! Blanditiis, suscipit!"
            }
        ])
    }, [])

    return (
        <IonCard
            style={{
                marginBottom: "20px"
            }}
        >
            <IonCardContent
                style={{
                    borderBottom: "1px solid #C4C4C4"
                }}
            >
                <h1>Faqs</h1>
            </IonCardContent>
            <div
                className="faqs "
                style={{
                    // margin: "auto",
                    padding: "1%"
                }}
                id="faqs"
            >
                <div
                    style={{
                        border: "1px solid #e0e0e0",
                        marginTop: "20px"
                    }}
                    className="faqsMapDiv"
                >
                    {faqs.map((faq, index) => {
                        return (
                            <FaqQuestion
                                {...faq}
                                key={index}
                                index={index}
                                faqs={faqs}
                            />
                        )
                    })}
                </div>
            </div>
        </IonCard>
    )
}

export default FAQ
