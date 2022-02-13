
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import './index.scss'

const Layout = ({
  children,
  withHeader
}: React.PropsWithChildren<{
  withHeader?: boolean
}>) => {
  return (
    <div className="layout">
      {withHeader && <Header />}
      {children}
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  withHeader: true
}

export default Layout
