import ReactGA from "react-ga4"
export const ButtonTrack = (data) => {
  ReactGA.event({
    category: "your category",
    action: "your action",
    label: "your label", // optional
    value: 99, // optional, must be a number
    nonInteraction: true, // optional, true/false
    transport: "xhr" //
  })
}
