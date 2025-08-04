import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Profile from '../Profile'
import FilterGroups from '../FilterGroups'
import JobCard from '../JobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    employmentType: [],
    salaryRange: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})

    const {searchInput, employmentType, salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const formattedData = data.jobs.map(job => ({
        id: job.id,
        title: job.title,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
      }))

      this.setState({
        jobsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getJobs()
  }

  onSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  updateEmploymentType = id => {
    this.setState(prev => {
      const updTypes = prev.employmentType.includes(id)
        ? prev.employmentType.filter(type => type !== id)
        : [...prev.employmentType, id]
      return {employmentType: updTypes}
    }, this.getJobs)
  }

  updateSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobs)
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-btn" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    return jobsList.length === 0 ? (
      this.renderNoJobsView()
    ) : (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobCard key={job.id} jobData={job} />
        ))}
      </ul>
    )
  }

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.in_progress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="jobs-route">
        <div className="filter-group-section">
          <Profile />
          <FilterGroups
            onChangeType={this.updateEmploymentType}
            onChangeSalary={this.updateSalaryRange}
          />
        </div>
        <div className="job-content-section">
          <div className="search-container">
            <input
              type="search"
              value={searchInput}
              className="input-search"
              placeholder="Search"
              onChange={this.onSearchInput}
            />
            <button
              type="button"
              onClick={this.getJobs}
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderJobs()}
        </div>
      </div>
    )
  }
}

export default Jobs
