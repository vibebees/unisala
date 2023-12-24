export const htmlForEditor = (postText, type, value) => {
  const typeRegex = new RegExp(`<h3>\\s*${type}\\s*:.*?<\\/h3>`, "g")

  if (postText?.includes(type)) {
    console.log("includes")
    return postText.replace(
      typeRegex,
      `<h3> ${type} : <strong> ${value} </strong></h3>`
    )
  } else {
    console.log("Type doesn't exist: noooooooo")
    return postText
      ? postText + `<h3> ${type} : <strong> ${value} </strong></h3>`
      : `<h3> ${type} : <strong> ${value} </strong></h3>`
  }
}
