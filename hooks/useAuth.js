import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../src/features/auth/authSlice'
import * as jwtDecode from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)

  let username = ''
  let roles = []
  let isAdmin = false
  let isManager = false
  let status = 'Employee'

  if (token) {
    const decoded = jwtDecode.jwtDecode(token)
    const userInfo = decoded?.UserInfo

    if (userInfo) {
      username = userInfo.username
      roles = userInfo.roles || []
      isAdmin = roles.includes('Admin')
      isManager = roles.includes('Manager')
      status = isAdmin ? 'Admin' : isManager ? 'Manager' : status
    }
    return { username, roles, isAdmin, isManager, status }
  }

  return { username, roles, isAdmin, isManager , status}
}

export default useAuth
