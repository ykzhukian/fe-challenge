
import React, { useState, useCallback } from 'react'
import FormItem from './FormItem'
import { isValidEmail } from '@/utils'
import { requestInvite } from '@/api'
import useRequest from '@/utils/useRequest'
import correctSrc from '@/assets/images/check.png'

import './index.scss'

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  emailConfirm: ''
}

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

const InvitationForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [errorMap, setErrorMap] = useState<ErrorMap>(new Map())
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const { loading, result, sendRequest } = useRequest<InviteForm.InviteApiParams, string>({
    request: requestInvite,
    onError: () => {
      setFormData(INITIAL_FORM_DATA)
    }
  })

  // should keep func reference when used in FormItem props
  const handleValidateError = useCallback((key: string, error: string) => {
    if (error) {
      setErrorMap(map => {
        const updateMap = new Map(map)
        updateMap.set(key, error)
        return updateMap
      })
    } else {
      setErrorMap(map => {
        const updateMap = new Map(map)
        updateMap.delete(key)
        return updateMap
      })
    }
  }, [])

  const handleValidate = (): boolean => {
    let isValid = true
    formItems.forEach(({ dataKey, validator }) => {
      const error = validator(formData[dataKey], formData)
      if (error) {
        isValid = false
      }
      handleValidateError(dataKey, error)
    })
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempted(true)
    // validate
    const isValid = handleValidate()
    if (isValid) {
      // submit form
      sendRequest({
        name: formData.name,
        email: formData.email
      })
    }
  }

  if (result) {
    return (
      <div className="invitation-form">
        <p className="form-success-message">
          <img src={correctSrc} alt="valid icon" />
          We have received your request.
        </p>
        <p className="form-success-message">Thank you!</p>
      </div>
    )
  }

  return (
    <div className="invitation-form">
      <p className="form-title">Request an invite</p>
      <form role="invite-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </form>
    </div>
  )
}

export default InvitationForm
