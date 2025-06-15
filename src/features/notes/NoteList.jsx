import { ClipLoader } from 'react-spinners'
import Note from './Note'
import { useGetAllNotesQuery } from './notesApiSlice'
import useAuth from '../../../hooks/useAuth'
import useTitle from '../../../hooks/useTitle'

const NoteList = () => {
  useTitle('techNotes - Notes List')
  const { username, isAdmin, isManager} = useAuth()
  const {
    data: notes,
    isLoading,
    isError,
    isSuccess,
    error
  } = useGetAllNotesQuery('notesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
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
    const { ids, entities } = notes
    let filteredIds ;
    if(isAdmin || isManager){
      filteredIds = [...ids]
    }else{
      filteredIds = ids.filter(noteId=> entities[noteId].username === username)
      console.log(filteredIds)
      console.log(entities)
    }
    

    const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

    content = (
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Created</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Updated</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Owner</th>
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

export default NoteList