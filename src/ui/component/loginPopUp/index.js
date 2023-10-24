import {IonPopover} from "@ionic/react"
import ProfilePop from "../profilePop"

export const LoginPopUp = ({allProps}) => {

    const {popover, popoverOpen, setPopoverOpen, activeNavDrop, setActiveNavDrop, setActive} = allProps

    return (
        <IonPopover
        ref={popover}
        isOpen={popoverOpen}
        onDidDismiss={() => setPopoverOpen(false)}
      >
        <ProfilePop
          setPopoverOpen={setPopoverOpen}
          activeNavDrop={activeNavDrop}
          setActiveNavDrop={setActiveNavDrop}
          setActive={setActive}
        />
      </IonPopover>
    )
}
