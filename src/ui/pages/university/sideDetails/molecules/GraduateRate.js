import React from "react"
import { Bar } from "react-chartjs-2"

const labelMapping = {
  americanIndianOrAlaskaNative: "Native American",
  asian: "Asian",
  blackOrAfricanAmerican: "Black",
  hispanic: "Hispanic",
  men: "Men",
  nonresidentAlien: "International",
  raceEthnicityUnknown: "Unknown",
  totalCohort: "Total Cohort",
  twoOrMoreRaces: "Multi-Racial",
  white: "White",
  women: "Women"
}

const GraduationRatesChart = ({ data }) => {
  const newData = { ...data }
  delete newData.__typename

  const values = Object.values(newData)
  const labels = Object.keys(newData).map((key) => labelMapping[key])

  const datas = {
    labels: labels,
    datasets: [
      {
        label: "Graduation Rate (%)",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="h-4/5 pb-5">
      <h2 className="font-semibold px-7 py-4 text-lg">
        Graduation Rates by Category
      </h2>
      <div>
        <Bar
          data={datas}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: "Graduation Rate (%)" // Y-axis label
                }
              },
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

export default GraduationRatesChart
