export const isValidEmail = (email: string): boolean => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

export const validInviteForm = ({
  name,
  email,
  emailConfirm
}: InviteFormData): ErrorMap => {
  const errorMap = new Map()

  // verify name
  if (name.length < 3) {
    errorMap.set('name', 'Please enter your full name')
  }

  // verify email
  if (!isValidEmail(email)) {
    errorMap.set('email', 'Email address is not valid')
  }

  // verify email confirm
  if (email !== emailConfirm) {
    errorMap.set('email-confirm', 'Different email addresses entered')
  }

  return errorMap
}
