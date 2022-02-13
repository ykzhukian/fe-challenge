
import logoSrc from '@/assets/images/broccoli.png'

import './index.scss'

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={logoSrc} alt="logo" />
      </div>
      <div className="company-name">Broccoli &amp; Co.</div>
    </header>
  )
}

export default Header
