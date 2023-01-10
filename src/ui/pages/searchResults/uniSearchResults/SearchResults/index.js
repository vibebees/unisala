// eslint-disable-next-line no-use-before-define
import React from "react"
import { IonCard, IonCardContent, IonText } from "@ionic/react"
import "./index.css"
import CourseCard from "../../../../component/CourseCard"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function index() {
    const { searchData } = useSelector((store) => store?.University || [])
    return (
        <>
            {Array.isArray(searchData) &&
                searchData.map((data, index) => {
                    return (
                        <Link
                            to={`/university/${data?.elevatorInfo?.name}`}
                            key={index}
                        >
                            <CourseCard
                                name={data?.elevatorInfo?.name}
                                city={data?.elevatorInfo?.city}
                                average={data?.report?.average}
                                act={data?.applicants?.actRange}
                                acceptanceRate={
                                    data?.applicants?.acceptanceRate
                                }
                            />
                        </Link>
                    )
                })}
        </>
    )
}

export default index
