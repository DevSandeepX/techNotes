import { ClipLoader } from 'react-spinners'
import { useGetAllUsersQuery } from './usersApiSlice'
import { useParams } from "react-router-dom"
import EditUserForm from './EditUserForm'
import useTitle from '../../../hooks/useTitle'

const EditUser = () => {
  useTitle('techNotes - Edit User')
  const { id } = useParams()

  const {user} = useGetAllUsersQuery('usersList', {
    selectFromResult:({ data })=>({
      user : data?.entities?.[id]
    })
  })

  const content = user?<EditUserForm user={user}/> :<ClipLoader color="#4F46E5" loading={true} size={50} />
  return content
}

export default EditUser