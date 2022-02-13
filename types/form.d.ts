type ErrorMap = Map<string, string>

interface InviteFormData {
  name: string
  email: string
  emailConfirm: string
}

interface FormItemProps {
  dataKey: keyof InviteFormData
  formValues: InviteFormData
  onValidate: (k: string, v: string) => void
  onChange: (val: string) => void
  validator: (val: string) => string | undefined
  placeholder?: string
}
