export const htmlForEditor = (postText, type, value) => {
  const typeRegex = new RegExp(`<h3>\\s*${type}\\s*:.*?<\\/h3>`, "g")

  if (value.trim() === "") {
    return postText.replace(typeRegex, "")
  }

  if (postText?.includes(type)) {
    return postText.replace(
      typeRegex,
      `<h3> ${type} : <strong> ${value} </strong></h3>`
    )
  } else {
    return postText
      ? postText + `<h3> ${type} : <strong> ${value} </strong></h3>`
      : `<h3> ${type} : <strong> ${value} </strong></h3>`
  }
}
