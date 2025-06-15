import React, { use, useEffect } from 'react'
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import { logOut } from '../features/auth/authSlice'
import { ClipLoader } from "react-spinners";



import useAuth from '../../hooks/useAuth'
import { useSendLogOutMutation } from '../features/auth/authApiSlice'
const DashLayout = () => {
  const [sendLogOut, { isLoading, isError, isSuccess, error }] = useSendLogOutMutation()
  const { username, isAdmin, isManager, status } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const showHomeButton =
    pathname.startsWith('/dash') &&
    pathname !== '/dash' &&
    pathname !== '/dash/'

   


  const onSendLogoutClicked = async () => {
    try {
        await sendLogOut().unwrap() 
        navigate('/')
    } catch (err) {
      console.log(err)
    }

  }

  

  if (isLoading) return <ClipLoader color="#4F46E5" loading={true} size={50} />
  if(isError) return <p>{error?.data?.message}</p>

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-indigo-600 text-white py-4 px-6 shadow-md flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">techNotes</h1>
        <button
          onClick={onSendLogoutClicked}
          className='px-4 py-2 bg-red-600 text-white rounded'>Logout</button>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-gray-700 py-4 px-6 text-center text-sm">
        <p>
          Current User: <span className="font-semibold">{username}</span> | Current status: <span className="font-semibold">{status}</span>
        </p>

        {showHomeButton && (
          <div className="mt-2">
            <Link
              to="/dash"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
            >
              🏠 Go To Home
            </Link>
          </div>
        )}
      </footer>
    </div>
  )
}

export default DashLayout
