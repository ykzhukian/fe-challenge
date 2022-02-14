type ErrorMap = Map<string, string>

namespace InviteForm {
  interface InviteFormData {
    name: string
    email: string
    emailConfirm: string
  }

  interface FormItemData {
    dataKey: keyof InviteFormData
    placeholder?: string
    validator: (val: string, formData?: InviteFormData) => string
  }

  interface FormItemProps {
    value: string
    errorMap: ErrorMap
    submitAttempted: boolean
    dataKey: keyof InviteFormData
    onChange: (val: string) => void
    placeholder?: string
  }

}
