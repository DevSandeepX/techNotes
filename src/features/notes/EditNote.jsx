import { useParams } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import EditNoteForm from './EditNoteForm'
import { useGetAllNotesQuery } from './notesApiSlice'
import { useGetAllUsersQuery } from '../users/usersApiSlice'
import useTitle from '../../../hooks/useTitle'
import { ClipLoader } from 'react-spinners'
const EditNote = () => {
  useTitle('techNotes - Edit Note')
  const { id } = useParams()

  const { username, isAdmin, isManager } = useAuth()

  const { note } = useGetAllNotesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id]
    })
  })

  const { users } = useGetAllUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
    })
  })


  if (!note || !users?.length) <ClipLoader color="#4F46E5" loading={true} size={50} />

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p>No Access</p>
    }
  }

  const content = <EditNoteForm note={note} users={users} />
  return content
}

export default EditNote