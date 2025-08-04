import './index.css'

const NotFound = () => (
  <div className="nf-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="nf-img"
    />
    <h1 className="nf-title">Page Not Found</h1>
    <p className="nf-desc">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
