import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAllUsersQuery } from './usersApiSlice'
import { memo } from 'react'
const User = ({ userId }) => {
    const navigate = useNavigate()

    const handleEdit = () => navigate(`/dash/users/${userId}`)

    const { user } = useGetAllUsersQuery(undefined, {
        selectFromResult: ({ data }) => ({
            user: data?.entities?.[userId]
        })
    })

    if (user) {
        return (
            <tr key={userId} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-800">{user.username}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.roles.join(', ')}</td>
                <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.active ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td className="px-6 py-4 text-sm">
                    <button
                        onClick={handleEdit}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        Edit
                    </button>
                </td>
            </tr>
        )

    } else return null
}


const memorizedUser = memo(User)


export default memorizedUser