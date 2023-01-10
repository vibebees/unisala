const { assoc, map, mapObjIndexed } = require("ramda"),
    graderMapper = {
        100: "A+",
        95: "A",
        90: "A-",
        85: "B+",
        80: "B",
        75: "B-",
        70: "C+",
        65: "C",
        60: "C-",
        55: "D+",
        50: "D",
        45: "D-",
        40: "E+",
        35: "E",
        30: "E-",
        25: "F+",
        20: "F",
        15: "F-"
    },
    convertGrade = (value) => graderMapper[value],
    clientReady = (gqlReturnedData) => {
        const { data } = gqlReturnedData,
            { searchSchool } = data
        map((o) => assoc("report", mapObjIndexed(convertGrade, o.report), o))(searchSchool)
    }

    module.exports = {
        clientReady
    }
