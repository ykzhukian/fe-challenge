
import InvitationForm from '@/components/InvitationForm'
import Modal from '@/components/Modal'

import './index.scss'

const Home = () => (
  <div className="homepage">
    <div className="section">
      <h1 className="slogan">A better way to enjoy every day.</h1>
      <p className="description">Be the first to know when we launch.</p>
      <Modal
        content={<InvitationForm />}
        trigger={<button role="cta-btn" className="request-btn btn">Request an invite</button>}
      />
    </div>
  </div>
)

export default Home
