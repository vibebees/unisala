const config = require("./config")
module.exports = (() => {
  if (config.NODE_ENV === "DEVELOPMENT") {
    return {
      messagingServiceAddress: "http://localhost:2222",
      universityServiceAddress: "http://localhost:9999",
      messageSocketAddress: "ws://localhost:2224",
      userServiceAddress: "http://localhost:4444",
      callSocketAddress: "ws://localhost:4445",
      spaceAddress: "http://localhost:4444/user/space"
    }
  }
  if (config.NODE_ENV === "TEST") {
    return {
      messagingServiceAddress: "http://test.unisala.com/msg",
      universityServiceAddress: "http://test.unisala.com/uni",
      messageSocketAddress: "ws://test.unisala.com/msg",
      userServiceAddress: "http://test.unisala.com/user",
      callSocketAddress: "ws://localhost:4445",
      spaceAddress: "http://test.unisala.com/space"
    }
  }

  if (config.NODE_ENV === "PRODUCTION") {
    return {
      messagingServiceAddress: "https://unisala.com/msg",
      universityServiceAddress: "https://unisala.com/uni",
      messageSocketAddress: "ws://unisala.com/msg",
      userServiceAddress: "https://unisala.com/user",
      callSocketAddress: "ws://localhost:4445",
      spaceAddress: "https://unisala.com/space"
    }
  }
  return {
    base: "https://unisala.com"
  }
})()
