import React from 'react'
import classnames from 'classnames'

import errorSrc from '@/assets/images/close.png'
import correctSrc from '@/assets/images/check.png'

const FormItem = ({
  value,
  dataKey,
  errorMap,
  placeholder,
  submitAttempted,
  onChange
}: InviteForm.FormItemProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const errorMsg = errorMap.get(dataKey)
  const showError = submitAttempted && errorMsg

  return (
    <div className={classnames('form-item', { error: showError })}>
      <input value={value} onChange={handleChange} type="text" placeholder={placeholder} />
      <span className="status-icon">
        {showError && <img src={errorSrc} alt="error icon" />}
        {value !== '' && !errorMsg && <img src={correctSrc} alt="valid icon" />}
      </span>
      {showError && <span className="form-error">{errorMsg}</span>}
    </div>
  )
}

FormItem.defaultProps = {
  errors: new Map(),
  placeholder: ''
}

export default FormItem
