import { IonAvatar } from "@ionic/react"
import { forwardRef } from "react"
import { cn } from "utils"

const Avatar = forwardRef(({ className, ...rest }, ref) => {
  return (
    <IonAvatar ref={ref} className={cn(className)} {...rest}>
      <img
        alt="Silhouette of a person's head"
        src="https://ionicframework.com/docs/img/demos/avatar.svg"
      />
    </IonAvatar>
  )
})

Avatar.displayName = "Avatar"

export default Avatar
