import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {HiOutlineBriefcase} from 'react-icons/hi'
import {GoLinkExternal} from 'react-icons/go'

import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: null,
    similarJobs: [],
    isLoading: true,
    isErr: false,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  formattedJobData = data => ({
    id: data.id,
    title: data.title,
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(skill => ({
      name: skill.name,
      imageUrl: skill.image_url,
    })),
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
  })

  formattedSimilarJobData = data => ({
    id: data.id,
    title: data.title,
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
  })

  getJobDetails = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        const jobDetails = this.formattedJobData(data.job_details)
        const similarJobs = data.similar_jobs.map(this.formattedSimilarJobData)

        this.setState({
          jobDetails,
          similarJobs,
          isLoading: false,
        })
      } else {
        this.setState({isErr: true, isLoading: false})
      }
    } catch (error) {
      this.setState({isErr: true, isLoading: false})
    }
  }

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state

    if (!jobDetails) {
      return null // Return nothing if jobDetails is null or undefined
    }

    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="job-detail-page">
        <div className="job-card">
          <div className="job-header-column">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="logo"
            />
            <h1 className="job-title">{title}</h1>
            <p className="rating">⭐ {rating}</p>
          </div>

          <div className="job-info">
            <p>
              <FaMapMarkerAlt size={20} color="#ffffff" /> {location}
            </p>
            <p>
              <HiOutlineBriefcase size={20} color="#ffffff" /> {employmentType}
            </p>
            <p>{packagePerAnnum}</p>
          </div>

          <hr />

          <div className="job-visit">
            <h1>Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit-link"
            >
              Visit <GoLinkExternal />
            </a>
          </div>

          <p>{jobDescription}</p>

          <h3>Skills</h3>
          <ul className="skills-list">
            {skills.map(skill => (
              <li className="skill-item" key={skill.name}>
                <img
                  src={skill.imageUrl}
                  className="skill-logo"
                  alt={skill.name}
                />
                <p>{skill.name}</p>
              </li>
            ))}
          </ul>

          <h3>Life at Company</h3>
          <div>
            <p>{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              className="lac-img"
              alt="life at company"
            />
          </div>
        </div>

        <h2>Similar Jobs</h2>
        <ul className="similar-jobs-list">
          {similarJobs.map(job => (
            <li key={job.id} className="similar-job-card">
              <div className="sj-header">
                <img
                  src={job.companyLogoUrl}
                  className="sj-img"
                  alt="similar job company logo"
                />
                <div>
                  <h2>{job.title}</h2>
                  <p>⭐ {job.rating}</p>
                </div>
              </div>
              <h3>Description</h3>
              <p>{job.jobDescription}</p>
              <div className="sj-info">
                <p>
                  <FaMapMarkerAlt size={20} color="#ffffff" />
                  {job.location}
                </p>
                <p>
                  <HiOutlineBriefcase size={20} color="#ffffff" />
                  {job.employmentType}
                </p>
                <p>{job.packagePerAnnum}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading, isErr} = this.state

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }

    if (isErr) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failure-img"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button
            type="button"
            className="retry-btn"
            onClick={this.getJobDetails}
          >
            Retry
          </button>
        </div>
      )
    }

    return this.renderJobDetails()
  }
}

export default JobItemDetails
