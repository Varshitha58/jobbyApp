import {Link} from 'react-router-dom'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {HiOutlineBriefcase} from 'react-icons/hi'
import './index.css'

const JobCard = ({jobData}) => {
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="job-card-link">
      <div className="job-card">
        <div className="job-header">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div>
            <h2>{title}</h2>
            <p>⭐{rating}</p>
          </div>
        </div>
        <div className="job-info">
          <div>
            <p>
              <FaMapMarkerAlt />
              {location}
            </p>
            <p>
              <HiOutlineBriefcase />
              {employmentType}
            </p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>

        <hr />
        <h3>Description</h3>
        <p>{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard
