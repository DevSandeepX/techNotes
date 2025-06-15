import { Outlet, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useRefreshMutation } from './authApiSlice'
import usePersist from '../../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import { ClipLoader } from 'react-spinners'




const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                try {
                    await refresh()
                    setTrueSuccess(true)

                } catch (error) {
                    console.log(error)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true
    }, [])

    let content;

    if (!persist) {

        content = <Outlet />
    }
    else if (isLoading) {

        content = <ClipLoader color="#4F46E5" loading={true} size={50} />
    }
    else if (error) {

        content = <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm text-center">
            {`${error?.data?.message} `}
            <Link to="/login" className="underline font-medium text-red-800 hover:text-red-900">
                Please Login Again
            </Link>
        </p>

    }
    else if (isSuccess && trueSuccess) {

        content = <Outlet />
    } else if (token && isUninitialized) {

        content = <Outlet />
    }


    return content
}

export default PersistLogin