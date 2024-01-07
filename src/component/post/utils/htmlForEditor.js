export const htmlForEditor = (postText, type, value) => {
  const typeRegex = new RegExp(`<h3>\\s*${type}\\s*:.*?<\\/h3>`, "g")
  const universityLink = `<a> ${type} : <a href="/university/${value}"> ${value} </a></a>`
  if (value.trim() === "") {
    return postText.replace(typeRegex, "")
  }

  console.log(type.toLowerCase() === "university")
  console.log({ universityLink, type })
  if (postText?.includes(type)) {
    if (type.toLowerCase() === "university 🏫") {
      return postText.replace(typeRegex, universityLink)
    }
    return postText.replace(
      typeRegex,
      `<h3> ${type} : <span> ${value} </span></h3>`
    )
  } else {
    if (type.toLowerCase() === "university") {
      return postText.replace(typeRegex, universityLink)
    }
    return postText
      ? postText + `<h3> ${type} : <span> ${value} </span></h3>`
      : `<h3> ${type} : <span> ${value} </span></h3>`
  }
}
