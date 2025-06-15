import React, { use } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

const Welcome = () => {
  const {username, isAdmin, isManager} = useAuth()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-300 to-blue-300 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome {username} !</h1>

        <div className="space-y-4">
  <Link
    to="/dash/notes"
    className="block bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition duration-200"
  >
    📘 View Notes
  </Link>

  <Link
    to="/dash/notes/new"
    className="block bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition duration-200"
  >
    📝 Add New Note
  </Link>

  {(isAdmin || isManager) && <Link
    to="/dash/users"
    className="block bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition duration-200"
  >
    ⚙️ View User Settings
  </Link> }

  
{(isAdmin || isManager) && <Link
    to="/dash/users/new"
    className="block bg-purple-500 hover:bg-purple-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md transition duration-200"
  >
    ➕ Add New User
  </Link>}
  
</div>

      </div>
    </div>
  )
}

export default Welcome
