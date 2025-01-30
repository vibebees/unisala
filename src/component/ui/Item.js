import { IonItem } from "@ionic/react"
import { forwardRef } from "react"
import { cn } from "utils"

const Item = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonItem ref={ref} className={cn(className)} {...rest}>
      {children}
    </IonItem>
  )
})

Item.displayName = "Item"

export default Item
