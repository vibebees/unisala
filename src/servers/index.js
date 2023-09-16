const config = require("./config")
module.exports = (() => {
  if (config.NODE_ENV === "DEVELOPMENT") {
    return {
      messagingServiceAddress: "http://localhost:2222",
      universityServiceAddress: "http://localhost:9999",
      messageSocketAddress: "ws://localhost:2224",
      userServiceAddress: "http://localhost:4444",
      callSocketAddress: "ws://localhost:4445",
      spaceAddress: "http://localhost:4444/space"
    }
  }

  if (config.NODE_ENV === "TEST") {
    return {
      messagingServiceAddress: "http://100.26.217.90/msg",
      universityServiceAddress: "http://100.26.217.90/uni",
      messageSocketAddress: "ws://localhost:2224",
      userServiceAddress: "http://100.26.217.90/user",
      callSocketAddress: "ws://localhost:4445",
      spaceAddress: "http://100.26.217.90/space"
    }
  }
  return {
    base: "https://unisala.com"
  }
})()
