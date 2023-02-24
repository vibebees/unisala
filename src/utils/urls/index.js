
const config = require("./config")
module.exports = (() => {

    if (config.NODE_ENV === "DEVELOPMENT") {
        return {
            //  "http://44.204.233.28"
            "base": (() => {
                if (config.NODE_ENV === "DEVELOPMENT") {
                    return {
                        "messagingService": "http://localhost:2222",
                        "universityService": "http://localhost:9999"
                    }
                }
                 return "http://44.204.233.28"
            })(),
            "messagingService": "http://localhost:2222",
            "universityService": "http://localhost:9999"
        }
    }
    return {
        "base": "http://44.204.233.28"
    }
})()
