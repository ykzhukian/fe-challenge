import React, { useState } from 'react'
import classnames from 'classnames'

import './index.scss'

const Modal = ({
  trigger,
  content
}: {
  content: React.ReactNode
  trigger: React.ReactNode
}) => {
  const [visible, setVisible] = useState(false)

  const handleVisibleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setVisible(val => !val)
  }

  return (
    <div className="modal-wrapper">
      <span className={classnames('modal-mask', { visible })} onClick={handleVisibleToggle} />
      {/* the popup modal */}
      <div className={classnames('modal', { visible })}>
        <span className="modal-close-btn" onClick={handleVisibleToggle} />
        {visible && content}
      </div>
      {/* modal trigger */}
      <div className="modal-trigger" onClick={handleVisibleToggle}>
        {trigger}
      </div>
    </div>
  )
}

export default Modal
