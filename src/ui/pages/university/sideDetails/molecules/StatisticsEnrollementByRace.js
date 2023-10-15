import React from "react"
import StatisticsPieChartCard from "../atoms/StatisticsPieChartCard"

const StatisticsEnrollementByRace = ({ data }) => {
  return (
    <div className="h-full">
      <div>
        <h3 className=" px-5 mt-3 font-medium text-lg">Enrollment by Race</h3>
      </div>
      <StatisticsPieChartCard data={data} />
    </div>
  )
}

export default StatisticsEnrollementByRace
