const validate = (data) => {
  const errors = {}
  if (!data?.firstName) {
    errors.firstName = "First name required"
  }
  if (!data?.lastName) {
    errors.lastName = "Last name required"
  }
  if (
    !data?.email?.match(
      /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/gi
    )
  ) {
    errors.email = "Invalid email address."
  }
  if (!data?.password) {
    errors.password = "Password field is required"
  } else if (
    !data?.password?.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    )
  ) {
    errors.password =
      "Password must be at least 8 characters long, contain at least one lowercase letter, uppercase letter, number and ymbol"
  }
  return errors
}

export default validate
