import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import useAuth from '../../../hooks/useAuth'
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
const EditNoteForm = ({ users, note }) => {
    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

const [deleteNote, {
    isLoading:isDelLoading,
    isSuccess:isDelSuccess,
    isError:isDelError,
    error:delError
}] = useDeleteNoteMutation()


    const navigate = useNavigate()
    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [userId, setUserId] = useState(note.user)
    const [completed, setCompleted] = useState(note.completed)
    const { status} = useAuth()


    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess,isDelSuccess, navigate])

    const onTitleChange = e => setTitle(e.target.value)
    const onTextChange = e => setText(e.target.value)
    const onUserIdChange = e => setUserId(e.target.value)
    const onCompletedChange = e => setCompleted(prev => !prev)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()

        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async()=>{
        await deleteNote({id:note.id})

    }
    const created = new Date(note.createdAt).toLocaleString('em-US', { day: 'numeric', month: 'long' })
    const updated = new Date(note.updatedAt).toLocaleString('em-US', { day: 'numeric', month: 'long' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            >{user.username}</option>
        )
    })

    const errContent = (error?.data?.message ?? '')

    const content = (
        <>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6 mt-10">
                <h2 className="text-2xl font-bold text-gray-800">Edit Item</h2>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={onTitleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Text</label>
                    <textarea
                        value={text}
                        onChange={onTextChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={onCompletedChange}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-gray-700 font-medium">Completed</label>
                </div>

                <div className="flex items-center space-x-2">
                    <select name="userlist" 
                    value={userId}
                    onChange={onUserIdChange}
                    className="h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    id="userlist">
                        {options}
                    </select>
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        onClick={onSaveNoteClicked}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-xl shadow transition duration-200"
                    >
                        Update
                    </button>

                    {(status === 'Admin' || status=== 'Manager') && (<button
                    onClick={onDeleteNoteClicked}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-xl shadow transition duration-200"
                    >
                        Delete
                    </button>) }
                    
                </div>
            </div>
        </>
    )
    return content
}

export default EditNoteForm