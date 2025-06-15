import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

const AutoAuth = () => {
    const { username } = useAuth()
    const navigate = useNavigate()
    console.log(username || "No aviable")
    const handleReAuth = () => {
        username ? (navigate('/dash')):(navigate('/login'))
    }

    return (
        <button
            onClick={handleReAuth}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-sm md:text-base font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
            Get Started
        </button>
    )
}

export default AutoAuth