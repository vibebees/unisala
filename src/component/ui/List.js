import { IonList } from "@ionic/react"
import { forwardRef } from "react"
import { cn } from "utils"

const List = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonList ref={ref} className={cn(className)} {...rest}>
      {children}
    </IonList>
  )
})

List.displayName = "List"

export default List
