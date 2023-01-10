// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCard } from "@ionic/react"
import { Link } from "react-router-dom"
import CourseCard from "../CourseCard"

function index() {
    const item = {
        image: "https://cdn.vox-cdn.com/thumbor/l5-CNuyDLr8IR8dWTW_7wqnT_bc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084622/5f1b1bd4b8800.image.jpg",
        Title: "Nicholls State University",
        description:
            "Southeastern Louisiana is a public university located in Hammond, Louisiana. It is a mid-size institution with an enrollment of 9,248 undergraduate students ....Read More",
        location: "HAMMOND , LA",
        review: "4.94*67 Reviews",
        avarage: "A+",
        acceptance: "90%",
        act: "19 - 24",
        type: "university"
    }
    return (
        <Link to="/university/1">
            <CourseCard
                image={item.image}
                Title={item.Title}
                description={item.description}
                locations={item.location}
                review={item.review}
                avarage={item.avarage}
                acceptance={item.acceptance}
                act={item.act}
                type={item.type}
            />
        </Link>
    )
}

export default index
