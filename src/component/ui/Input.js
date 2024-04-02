import { IonInput } from "@ionic/react"
import { forwardRef } from "react"
import { cn } from "utils"

const Input = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <IonInput ref={ref} className={cn("w-fit ", className)} {...rest}>
      {children}
    </IonInput>
  )
})

Input.displayName = "Input"

export default Input
