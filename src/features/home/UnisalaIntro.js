import {
  IonCard,
  IonCardContent,
  IonButton,
  IonText,
  IonIcon
} from "@ionic/react"
import roadmap from "assets/roadmap.png"
import { lockOpenOutline } from "ionicons/icons"
import ExploreUniversities from "assets/ExploreUniversity.png"

export const UnisalaLandingPage = ({ allProps }) => {
  return (
    <div style={{ margin: "27px 0px 0px 0px" }}>
      <IonCard className="mb-1">
        <IonCardContent className="flex-column text-left">
          <h1 className="pt-1 pb-05 black-text">
            Your Study In USA Roadmap & Tracker:
          </h1>
          <p>
            <br />
            Embarking on the journey of studying abroad is an adventure of a
            lifetime. Like any great journey, having a roadmap ensures you do
            not miss a single step. Dive into each phase of your adventure
            below.
          </p>
          <ol></ol>
        </IonCardContent>
      </IonCard>

      <IonCard className="mb-1 !">
        <IonCardContent className="p-0 relative flex-column text-center">
          <img src={roadmap} alt="roadmap" />
          <div className="absolute w-full top-6 -right-7">
            <h1 className="pt-1 !font-bold !text-neutral-700 !text-3xl pb-05 black-text">
              Unlock Your Access to Amazing Features!
            </h1>
            <br />
            <div className="flex gap-4 w-full pr-28 justify-end ">
              <button
                className="capitalize wobble-hor-bottom text-neutral-100 flex items-center px-3 py-2 bg-blue-600 rounded-3xl"
                onClick={() => window.location.replace("/login")} // Replace '/login' with your login URL
              >
                <IonIcon icon={lockOpenOutline} />
                &nbsp; Log In Now
                <span className="animate-ping absolute inline-flex h-9 w-20 rounded-3xl bg-sky-400 opacity-50 scale-50"></span>
              </button>
            </div>
          </div>
        </IonCardContent>
      </IonCard>

      <IonCard className="mb-1 !">
        <IonCardContent className="p-0 relative flex-column text-center">
          <img src={ExploreUniversities} alt="roadmap" />
          <div className="absolute w-full bottom-20  -right-7">
            <br />
            <div className="flex gap-4 w-full pr-28 justify-start ">
              <button
                className="capitalize font-semibold  text-black flex items-center px-3 py-2 bg-neutral-100 hover:text-blue-600 rounded-3xl"
                onClick={() => window.open("/search?tab=uni", "_blank")}
              >
                Explore Universities
              </button>
            </div>
          </div>
        </IonCardContent>
      </IonCard>
      <IonCard className="mb-1 !">
        <IonCardContent className="p-0 relative flex-column text-center">
          <img src={roadmap} alt="roadmap" />
          <div className="absolute w-full top-6  -right-7">
            <h1 className="pt-1  !font-bold !text-neutral-700 !text-3xl  pb-05 black-text ">
              Your roadmap to study abroad
            </h1>
            <br />
            <div className="flex gap-4 w-full pr-28 justify-end ">
              <button
                className="capitalize wobble-hor-bottom text-neutral-100 flex items-center px-3 py-2 bg-blue-600 rounded-3xl"
                onClick={() => window.open("/roadmap", "_blank")}
              >
                VISA ROADMAP
                <span className="animate-ping absolute inline-flex h-9 w-20 rounded-3xl bg-sky-400 opacity-50 scale-50"></span>
              </button>
            </div>
          </div>
        </IonCardContent>
      </IonCard>

      <IonCard className="mb-1">
        <IonCardContent className="flex-column text-left">
          <h1 className="pt-1 pb-05 black-text">
            Linkedin like Platform for Aspiring, Current, and Alumni Students
          </h1>
          <p>
            <strong>Engage, ask, and learn. </strong>Tap into real experiences,
            get authentic university reviews, and gain insights on everything
            from <strong> courses to visa interviews.</strong> You`re not alone
            in this journey!
          </p>
        </IonCardContent>
      </IonCard>

      <IonCard className="mb-1">
        <IonCardContent className="flex-column text-center">
          <h1 className="pt-1 pb-05 black-text">
            Decide your Academic & Career journey with Data-Driven Insights.
          </h1>
          <p>
            Dive deep into our expansive collection, boasting over 6500 US
            universities and profiles of 500,000+ professors. Discover, compare,
            and make informed decisions based on comprehensivedata
          </p>
          <img
            src="https://yocket.com/svgs/ExploreUniversityIllustration.svg"
            alt="Explore Universities"
          />
        </IonCardContent>
      </IonCard>

      <IonCard className="mb-1">
        <IonCardContent className="flex-column text-center">
          <p>
            <br />
            Our team`s genuine expertise and insights, rooted in first-hand
            experiences, ensure that you`re guided by the best. Benefit from
            resources crafted by fellow graduates and current students to
            streamline your journey to the US.
          </p>
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
              Explore Over 6500 Universities
            </h1>
            <p>
              From esteemed Ivy League institutions to other reputed
              universities, discover the perfect academic environment aligned
              with your profile and goals.
            </p>
          </div>
          <img
            src="https://d15gkqt2d16c1n.cloudfront.net/images/dashboard/homepage/my-community.png"
            width={window.innerWidth > 768 ? "250px" : "100%"}
            alt="Community of Aspirants"
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
            alt="College Finder"
          />
          <div>
            <h1 className="pt-1 pb-05 black-text">
              Personalized Scholarship Predictor
            </h1>
            <p>
              Navigate your financial roadmap with ease!
              <br />
              <br />
              <strong> Enter your GPA, SAT or ACT scores </strong> and unveil
              potential <strong>scholarship</strong> opportunities awaiting you.
            </p>
          </div>
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
              Stay Updated with Application Tracker
            </h1>
            <p>
              Never miss out! With our application tracker, monitor your
              application status, ensuring you stay ahead with crucial dates and
              actions.
            </p>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  )
}
