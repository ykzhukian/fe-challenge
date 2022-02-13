import React, { useState } from 'react'
import classnames from 'classnames'

import errorSrc from '@/assets/images/close.png'
import correctSrc from '@/assets/images/check.png'

const FormItem = ({
  dataKey,
  formValues,
  placeholder,
  validator,
  onValidate,
  onChange
}: FormItemProps) => {
  const [errorMsg, setErrorMsg] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    // validate on change
    const error = validator(e.target.value) || ''
    setErrorMsg(error)

    if (error) {
      onValidate(dataKey, error)
    }
  }

  const value = formValues[dataKey]

  return (
    <div className={classnames('form-item', { error: errorMsg })}>
      <input value={value} onChange={handleChange} type="text" placeholder={placeholder} />
      {errorMsg && <span className="status-icon"><img src={errorSrc} alt="error icon" /></span>}
      {value !== '' && !errorMsg && <span className="status-icon"><img src={correctSrc} alt="valid icon" /></span>}
      {errorMsg && <span className="form-error">{errorMsg}</span>}
    </div>
  )
}

FormItem.defaultProps = {
  errors: new Map(),
  placeholder: ''
}

export default FormItem
