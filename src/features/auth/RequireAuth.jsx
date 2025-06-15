import { Outlet, useLocation, Navigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import React from 'react'

const RequireAuth = ({ allowedRoles }) => {
  const { roles } = useAuth()
  const location = useLocation()

  const isAuthorized = roles?.some(role => allowedRoles.includes(role))

  return (
    isAuthorized
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
