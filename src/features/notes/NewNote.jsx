import { ClipLoader } from 'react-spinners'
import { useGetAllUsersQuery} from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'
import useTitle from '../../../hooks/useTitle'


const NewNote = () => {
  useTitle('techNotes - Add Note')
  const {users} = useGetAllUsersQuery(undefined, {
    selectFromResult:({ data })=>({
      users: data?.ids.map(id=> data?.entities[id])
    })
  })

  if(!users.length){
    return <ClipLoader color="#4F46E5" loading={true} size={50} />
  }

  const content = <NewNoteForm users={users}/>

  return content
}

export default NewNote