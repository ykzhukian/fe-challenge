
import React, { useState, useCallback } from 'react'
import FormItem from './FormItem'
import { isValidEmail } from '@/utils'

import './index.scss'

const formItems: InviteForm.FormItemData[] = [{
  dataKey: 'name',
  placeholder: 'Full name',
  validator: (val) => {
    if (val.length < 3) {
      return 'Please enter your full name'
    }
    return ''
  }
}, {
  dataKey: 'email',
  placeholder: 'Email address',
  validator: (val) => {
    if (!val) {
      return 'Please enter your email address'
    } else if (!isValidEmail(val)) {
      return 'Email address is not valid'
    }
    return ''
  }
}, {
  dataKey: 'emailConfirm',
  placeholder: 'Confirm email address',
  validator: (val, data) => {
    if (!val) {
      return 'Please confirm your email address'
    }
    return val === data?.email ? '' : 'Different email addresses entered'
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
  const [submitAttempted, setSubmitAttempted] = useState(false)

  // should keep func reference when used in FormItem props
  const handleValidateError = useCallback((key: string, error: string) => {
    if (error) {
      setErrorMap(map => map.set(key, error))
    } else {
      setErrorMap(map => {
        const updateMap = new Map(map)
        updateMap.delete(key)
        return updateMap
      })
    }
  }, [])

  const handleValidate = () => {
    formItems.forEach(({ dataKey, validator }) => {
      const error = validator(formData[dataKey], formData)
      console.log('error', formData, error)
      handleValidateError(dataKey, error)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempted(true)
    // validate
    handleValidate()
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
        {formItems.map(({ dataKey, placeholder, validator }) => (
          <FormItem
            key={dataKey}
            errorMap={errorMap}
            placeholder={placeholder}
            submitAttempted={submitAttempted}
            dataKey={dataKey}
            value={formData[dataKey]}
            onChange={(val: string) => {
              setFormData(data => ({ ...data, [dataKey]: val }))
              // validate on change
              const error = validator(val, formData)
              handleValidateError(dataKey, error)
            }}
          />
        ))}
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  )
}

export default InvitationForm
