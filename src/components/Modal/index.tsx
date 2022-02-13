import React, { useState } from 'react'
import classnames from 'classnames'

import './index.scss'

const Modal = ({
  children,
  content
}: React.PropsWithChildren<{
  content: React.ReactNode
}>) => {
  const [visible, setVisible] = useState(true)

  const handleVisibleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setVisible(val => !val)
  }

  return (
    <div className="modal-wrapper">
      <span className={classnames('modal-mask', { visible })} onClick={handleVisibleToggle} />
      <div className={classnames('modal', { visible })}>
        {content}
      </div>
      <div className="modal-trigger" onClick={handleVisibleToggle}>
        {children}
      </div>
    </div>
  )
}

export default Modal
