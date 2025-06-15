import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAllNotesQuery } from './notesApiSlice'

const Note = ({ noteId }) => {
  const navigate = useNavigate()

  const { note } = useGetAllNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId]
    })
  })

  if (note) {
    const created = new Date(note.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long'
    })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long'
    })

    const handleEdit = () => navigate(`/dash/notes/${noteId}`)

    return (
      <tr key={noteId} className="hover:bg-gray-50 transition">
        <td className="px-6 py-4 text-sm text-gray-800">
          {note.completed ? <span>Completed</span> : <span>Open</span>}
        </td>
        <td className="px-6 py-4 text-sm text-gray-600">{created}</td>
        <td className="px-6 py-4 text-sm">{updated}</td>
        <td className="px-6 py-4 text-sm">{note.title}</td>
        <td className="px-6 py-4 text-sm">{note.username}</td>
        <td className="px-6 py-4 text-sm">
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            Edit
          </button>
        </td>
      </tr>
    )
  } else return null
}

const memorizedNote = memo(Note)

export default memorizedNote
