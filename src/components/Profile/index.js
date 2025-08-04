import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

class Profile extends Component {
  state = {
    profileData: null,
    isLoading: true,
    isError: false,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const profile = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({profileData: profile, isLoading: false})
    } else {
      this.setState({isLoading: false, isError: true})
    }
  }

  render() {
    const {profileData, isLoading, isError} = this.state

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    }

    if (isError) {
      return (
        <div className="failure-profile">
          <button type="button" onClick={this.getProfile}>
            Retry
          </button>
        </div>
      )
    }

    return (
      <div className="profile-card">
        <img
          src={profileData.profileImgUrl}
          className="profile"
          alt="profile"
        />
        <h1 className="profile-name">{profileData.name}</h1>
        <p className="profile-role">{profileData.bio}</p>
      </div>
    )
  }
}

export default Profile
