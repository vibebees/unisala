import React from "react"
import { Chart, registerables } from "chart.js"
import { Bar } from "react-chartjs-2"
Chart.register(...registerables)

const labelMapping = {
  americanIndianOrAlaskaNative: "Native American",
  asian: "Asian",
  blackOrAfricanAmerican: "Black",
  hispanic: "Hispanic",
  nativeHawaiianOrOtherPacificIslander: "Hawaiian/Pacific Islander",
  nonresidentAlien: "International",
  white: "White"
}

const StatisticsBarChartCard = ({ data }) => {
  const newData = { ...data }
  delete newData.grandTotal
  delete newData.__typename

  const labels = Object.keys(newData).map((key) => labelMapping[key])
  const values = Object.values(newData)

  const datas = {
    labels: labels,
    datasets: [
      {
        label: "Enrollment",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 1
      }
    ]
  }

  return (
    <div>
      <h2 className="py-2 font-normal mx-6">
        Total :{" "}
        <span className="font-medium text-neutral-700">{data.grandTotal}</span>
      </h2>
      <div>
        <Bar
          data={datas}
          options={{
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10
                  }
                }
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default StatisticsBarChartCard
