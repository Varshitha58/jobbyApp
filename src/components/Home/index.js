import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Home = () => (
  <div className="home-container">
    <h1 className="home-title">Find The Job That Fits Your Life</h1>
    <p className="home-desc">
      Millions of people are searching for jobs, salary information, company
      reviews. Find the job that fits your abilities and potential.
    </p>
    <Link to="/jobs">
      <button type="button" className="find-jobs-btn">
        Find Jobs
      </button>
    </Link>
  </div>
)

export default withRouter(Home)
