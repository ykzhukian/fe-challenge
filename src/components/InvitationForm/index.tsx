
import React, { useState, useCallback } from 'react'
import FormItem from './FormItem'
import { isValidEmail } from '@/utils'

import './index.scss'

const formItems = [{
  dataKey: 'name' as keyof InviteFormData,
  placeholder: 'Full name',
  validator: (val: string) => {
    if (val.length < 3) {
      return 'Please enter your full name'
    }
    return ''
  }
}, {
  dataKey: 'email' as keyof InviteFormData,
  placeholder: 'Email address',
  validator: (val: string) => {
    if (!isValidEmail(val)) {
      return 'Email address is not valid'
    }
    return ''
  }
}, {
  dataKey: 'emailConfirm' as keyof InviteFormData,
  placeholder: 'Confirm email address',
  validator: (val: string) => {
    return ''
  }
}]

const InvitationForm = ({
  onSuccess
}: {
  onSuccess?: () => void
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailConfirm: ''
  })
  const [errorMap, setErrorMap] = useState<ErrorMap>(new Map())

  const handleValidate = useCallback((key: string, err: string) => {
    console.log('on validate')
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (errorMap.size === 0) {

      // submit form
    } else {
      console.log('errorMap', errorMap)
    }
  }

  return (
    <div className="invitation-form">
      <p className="form-title">Request an invite</p>
      <form onSubmit={handleSubmit}>
        {formItems.map((item) => (
          <FormItem
            key={item.dataKey}
            formValues={formData}
            onValidate={handleValidate}
            onChange={(val) => setFormData(data => ({ ...data, [item.dataKey]: val }))}
            {...item}
          />
        ))}
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  )
}

export default InvitationForm
