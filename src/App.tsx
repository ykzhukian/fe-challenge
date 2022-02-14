import { Suspense, lazy } from 'react'
import { ToastContainer } from 'react-toastify'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Layout from '@/components/Layout'

const Home = lazy(() => import('@/views/Home'))
const PageNotFound = lazy(() => import('@/views/PageNotFound'))

const baseRoute = process.env.REACT_APP_BASE_ROUTE

const App = () => (
  <Router basename={baseRoute}>
    <ToastContainer />
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </Suspense>
  </Router>
)

export default App
