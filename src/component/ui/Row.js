import { IonRow } from "@ionic/react"
import { forwardRef } from "react"
import { cn } from "utils"

const Row = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonRow ref={ref} className={cn(className)} {...rest}>
      {children}
    </IonRow>
  )
})

Row.displayName = "Row"

export default Row
