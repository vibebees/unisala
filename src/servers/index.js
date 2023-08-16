
// eslint-disable-next-line no-process-env
const NODE_ENV = process.env.NODE_ENV || "TEST"
let config = {}

switch (NODE_ENV) {

    case "DEVELOPMENT":
        config = {
            messagingServiceAddress: "http://localhost:2222",
            universityServiceAddress: "http://localhost:9999",
            messageSocketAddress: "ws://localhost:2224",
            userServiceAddress: "http://localhost:4444",
            callSocketAddress: "ws://localhost:4445"
        }
        break
    case "TEST":
        config = {
            messagingServiceAddress: "http://test.unisala.com/msg",
            universityServiceAddress: "http://test.unisala.com/uni",
            messageSocketAddress: "ws://test.unisala.com/msg",
            userServiceAddress: "http://test.unisala.com/user",
            callSocketAddress: "ws://localhost:4445"
        }
        break
    case "PRODUCTION":
        config = {
            messagingServiceAddress: "http://unisala.com/msg",
            universityServiceAddress: "http://unisala.com/uni",
            messageSocketAddress: "ws://unisala.com/msg",
            userServiceAddress: "http://unisala.com/user",
            callSocketAddress: "ws://localhost:4445"
        }
        break
    default:
        config = {
            base: "https://unisala.com"
        }
}

module.exports = config
