import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation()
  const [deleteUser, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState(user.username)
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(user.roles)
  const [active, setActive] = useState(user.active)

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername('')
      setPassword('')
      setRoles([])
      navigate('/dash/users')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onUsernameChange = (e) => setUsername(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)

  const onRolesChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => opt.value)
    setRoles(values)
  }

  const onActiveChanged = () => setActive((prev) => !prev)

  const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active })
    } else {
      await updateUser({ id: user.id, username, roles, active })
    }
  }

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id })
  }

  const roleOptions = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ))

  const canSave = password
    ? [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    : [roles.length, validUsername].every(Boolean) && !isLoading

    const userNameError = (
        <p className='text-rose-600'>Min(3)-Max(20) space not allowed</p>
    )
    const passwordError = (
        <p className='text-red-600'>Min(4)-Max(12) space not allowed</p>
    )

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit User</h2>
      <form className="space-y-4" onSubmit={onSaveUserClicked}>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={onUsernameChange}
            className="w-full border border-gray-300 rounded-xl p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!validUsername && userNameError}
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
            className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {password && !validPassword && passwordError}
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Roles</label>
          <select
            multiple
            value={roles}
            onChange={onRolesChange}
            className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {roleOptions}
          </select>
          <small className="text-gray-500">Hold Ctrl or Cmd to select multiple</small>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">Active</label>
          <input
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={!canSave}
          className={`w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200 ${
            !canSave ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Save Changes
        </button>
      </form>

      <button
        onClick={onDeleteUserClicked}
        className="w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition duration-200"
      >
        Delete User
      </button>
    </div>
  )
}

export default EditUserForm
