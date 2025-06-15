import React, { useState } from 'react'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import usePersist from '../../../hooks/usePersist'
import { ClipLoader } from 'react-spinners'
const Login = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [persist, setPersist] = usePersist()


  const onSignInClicked = async (e) => {
    e.preventDefault()

    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setPassword('')
      setUsername('')
      navigate('/dash')
    } catch (error) {
      if (!error.status) {
        setErr('No Server Response')
      } else if (error.status === 400) {
        setErr('Missing Username or Password')
      } else if (error.status === 401) {
        setErr('Unauthorized')
      } else {
        setErr(error?.data?.message)
      }
    }
  }

  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)
  const handleToggle = () => setPersist(prev => !prev)

  if (isLoading) return <ClipLoader color="#4F46E5" loading={true} size={50} />
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-200 to-slate-100">
      <form
        onSubmit={onSignInClicked}
        className="bg-white text-gray-500 max-w-[350px] w-full mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Login Now
        </h2>

        {err && (
          <p className="mb-4 text-sm text-center text-red-600 font-medium bg-red-100 py-2 px-3 rounded">
            {err}
          </p>
        )}
        <input
          id="email"
          type="username"
          placeholder="Enter your username"
          required
          value={username}
          onChange={onUsernameChange}
          className="w-full border my-5 border-gray-500/30 outline-none rounded py-2.5 px-4"
        />

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={onPasswordChange}
          className="w-full border my-5 border-gray-500/30 outline-none rounded py-2.5 px-4"
        />



        <button
          type="submit"
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 active:scale-95 transition py-2.5 rounded text-white"
        >
          Log in
        </button>

        <label htmlFor="persist" className="flex gap-6">
          <input
            type="checkbox"
            id="persist"
            onChange={handleToggle}
            checked={persist}
          />
          Trust this device
        </label>

      </form>
    </div>
  )
}

export default Login
