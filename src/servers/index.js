const config = require("./config")
module.exports = (() => {
  if (config.NODE_ENV === "DEVELOPMENT") {
    return {
      messagingServiceAddress: "http://localhost:2222",
      universityServiceAddress: "http://localhost:9999",
      messageSocketAddress: "ws://localhost:2224",
      userServiceAddress: "http://localhost:4444",
      callSocketAddress: "ws://localhost:4445"
    }
  }
  if (config.NODE_ENV === "TEST") {
    // 54.177.237.36

    return {
      messagingServiceAddress: "http:/test.unisala.com/msg",
      universityServiceAddress: "http:/test.unisala.com/uni",
      messageSocketAddress: "ws://localhost:2224",
      userServiceAddress: "http:/test.unisala.com/user",
      callSocketAddress: "ws://localhost:4445"
    }
    // return {
    //   messagingServiceAddress: "http://test-unisala-537704751.ap-south-1.elb.amazonaws.com/msg",
    //   universityServiceAddress: "http://test-unisala-537704751.ap-south-1.elb.amazonaws.com/uni",
    //   messageSocketAddress: "ws://localhost:2224",
    //   userServiceAddress: "http://test-unisala-537704751.ap-south-1.elb.amazonaws.com/user",
    //   callSocketAddress: "ws://localhost:4445"
    // }
  }
  return {
    base: "https://unisala.com"
  }
})()
