import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationsList = ['Hyderabad', 'Bangalore', 'Chennai', 'Delhi', 'Mumbai']

const FilterGroups = props => {
  const {onChangeType, onChangeSalary, onChangeLocation} = props

  const renderType = () => (
    <>
      <h1 className="filters-heading">Type of Employment</h1>
      <ul className="type-list">
        {employmentTypesList.map(type => (
          <li key={type.employmentTypeId}>
            <input
              id={type.employmentTypeId}
              name="empType"
              type="checkbox"
              onChange={() => onChangeType(type.employmentTypeId)}
            />
            <label htmlFor={type.employmentTypeId}>{type.label}</label>
          </li>
        ))}
      </ul>
    </>
  )

  const renderSalary = () => (
    <>
      <h1 className="filters-heading">Salary Range</h1>
      <ul className="salary-list">
        {salaryRangesList.map(range => (
          <li key={range.salaryRangeId}>
            <input
              type="radio"
              name="salary"
              id={range.salaryRangeId}
              onChange={() => onChangeSalary(range.salaryRangeId)}
            />
            <label htmlFor={range.salaryRangeId}>{range.label}</label>
          </li>
        ))}
      </ul>
    </>
  )

  const renderLocation = () => (
    <>
      <h1 className="filters-heading">Location</h1>
      <ul className="location-list">
        {locationsList.map(loc => (
          <li key={loc}>
            <input
              type="checkbox"
              name="location"
              id={loc}
              value={loc}
              onChange={() => onChangeLocation(loc)}
            />
            <label htmlFor={loc}>{loc}</label>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div className="filers-group">
      {renderType()}
      <hr />
      {renderSalary()}
      <hr />
      {renderLocation()}
    </div>
  )
}

export default FilterGroups
