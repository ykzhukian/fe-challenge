
import { Link } from 'react-router-dom'

import './index.scss'

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <span>
        Ops, page not found...
        <Link to="/">Go Back</Link>
      </span>
    </div>
  )
}

export default PageNotFound
