import { ClipLoader } from 'react-spinners'
import User from './User'
import useTitle from '../../../hooks/useTitle'


import { useGetAllUsersQuery } from './usersApiSlice'
const UserList = () => {
  useTitle('techNotes - Users List')

  const {
    data: users,
    isLoading,
    isError,
    isSuccess,
    error
  } = useGetAllUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: false,
    refetchOnMountOrArgChange: true
  })


  let content;

  if (isLoading) {
    content = <ClipLoader color="#4F46E5" loading={true} size={50} />
  }

  if (isError) {
    content = <p>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = users

    const tableContent = ids?.length
      ? ids.map(userId => <User key={userId} userId={userId} />)
      : null

    content = (
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Username</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Roles</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tableContent}
          </tbody>
        </table>
      </div>
    )
  }

  return content
}

export default UserList