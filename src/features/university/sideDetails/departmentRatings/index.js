import { IonCardContent } from "@ionic/react"
import { CardHeader } from "component/Reusable/cardHeader"
import { Button, Card, Typography } from "component/ui"
import { useState } from "react"
import { Rating } from "./atoms/Rating"

export const DepartmentRating = ({ ratings }) => {
  const [ratingItems, setRatingItems] = useState(ratings.slice(0, 8))

  const handleDepartmentChange = () => {
    console.log("button clicked")
    setRatingItems(() => ratings.slice(0, ratingItems.length + 5))
  }

  return (
    <Card className="department mx-0  max-h-[600px] overflow-y-scroll">
      <CardHeader header={"Department Rating"} />

      <IonCardContent>
        <div className="grid grid-cols-3">
          {ratingItems.map((item, index) => (
            <Card key={index} className="py-4">
              <Typography variant="h5" className="text-center">
                {item.subject}
              </Typography>

              <IonCardContent>
                <Rating rating={item.overall_rating} />
              </IonCardContent>
            </Card>
          ))}
        </div>
        <Button
          type="button"
          fill="outline"
          size="small"
          className="p-0 outline-none border-none ml-auto block"
          onClick={handleDepartmentChange}
        >
          See more
        </Button>
      </IonCardContent>
    </Card>
  )
}

