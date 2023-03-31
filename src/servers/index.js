const config = require("./config")
module.exports = (() => {
  if (config.NODE_ENV === "DEVELOPMENT") {
    return {
      messagingServiceAddress: "http://localhost:2222",
      universityServiceAddress: "http://localhost:9999",
      messageSocketAddress: "ws://localhost:2224",
      userServiceAddress: "http://localhost:4444"
    }
  }
  return {
    base: "https://unisala.com"
  }
})()
