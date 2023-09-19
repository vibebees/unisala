import { IonCard, IonCardContent, IonButton, IonText } from "@ionic/react"
import roadmap from "./../../../assets/roadmap.png"

function UnisalaIntro() {
  return (
    <div style={{ margin: "27px 0px 0px 0px" }}>
      <IonCard className="mb-1 !">
        <IonCardContent className="p-0 relative flex-column text-center">
          <img src={roadmap} alt="roadmap" />
          <div className="absolute w-full top-6  -right-7">
            <h1 className="pt-1  !font-bold !text-neutral-700 !text-3xl  pb-05 black-text ">
              Your roadmap to study abroad
            </h1>
            <br />
            <div className="flex gap-4 w-full pr-28 justify-end ">
              <button className="capitalize  wobble-hor-bottom  text-neutral-100 flex items-center px-3 py-2 bg-blue-600 rounded-3xl">
                starts here
                <span className="animate-ping absolute inline-flex h-9 w-20 rounded-3xl bg-sky-400 opacity-50 scale-50"></span>
              </button>
            </div>
          </div>
        </IonCardContent>
      </IonCard>
      <IonCard className="mb-1">
        <IonCardContent className="flex-column text-center">
          <h1 className="pt-1 pb-05 black-text">
            Explore universities across the globe
          </h1>
          <p>
            Your research need not include tens of browser tabs when you can
            surf through 2000+ universities abroad, all in one place. We have
            also made it more convenient for you with easy filters and sort
            options!
          </p>
          <img
            src="https://yocket.com/svgs/ExploreUniversityIllustration.svg"
            alt=""
          />
        </IonCardContent>
      </IonCard>

      <IonCard className="mb-1">
        <IonCardContent
          className={
            window.innerWidth <= 768
              ? "flex-column"
              : "flex justify-content-start"
          }
        >
          <div>
            <h1 className="pt-1 pb-05 black-text">
              Connect with aspirants like you!
            </h1>
            <p>
              Your research need not include tens of browser tabs when you can
              surf through 2000+ universities abroad, all in one place. We have
              also made it more convenient for you with easy filters and sort
              options!
            </p>
          </div>
          <img
            src="https://d15gkqt2d16c1n.cloudfront.net/images/dashboard/homepage/my-community.png"
            width={window.innerWidth > 768 ? "250px" : "100%"}
            alt=""
          />
        </IonCardContent>
      </IonCard>

      <IonCard className="mb-1">
        <IonCardContent
          className={
            window.innerWidth <= 768
              ? "flex-column"
              : "flex justify-content-start"
          }
        >
          <img
            src="https://d15gkqt2d16c1n.cloudfront.net/images/dashboard/homepage/college-finder.png"
            width={window.innerWidth > 768 ? "250px" : "100%"}
            alt=""
          />
          <div>
            <h1 className="pt-1 pb-05 black-text">
              Find your dream universities abroad!
            </h1>
            <p>
              Your preferences, your profile and your grades. That is all IT
              needs. Yes! We use an algorithm equipped with our experience and
              expertise to tailor-make a list of ideal abroad universities for
              you.
            </p>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  )
}

export default UnisalaIntro
