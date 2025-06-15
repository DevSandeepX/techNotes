import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAddNewNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'

const NewNoteForm = ({users}) => {
  const [addNewNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewNoteMutation()


  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/notes')

    }
  }, [isSuccess, navigate])

  const onTitleChange = e => setTitle(e.target.value)
  const onTextChange = e => setText(e.target.value)
  const onUserIdChange = e => {
    setUserId(e.target.value)
    console.log(e.target.value)

  }

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
    e.preventDefault()

    if (canSave) {
      await addNewNote({ user: userId, title, text })
    }
  }


  const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

  const errContent = (
    <p className='text-red-600'>{error?.data?.message}</p>
  )

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
          <select
                    id="username"
                    name="username"
                    className=" h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    value={userId}
                    onChange={onUserIdChange}
                >
                    {options}
                </select>
              


        </div>
        <div className="flex justify-between pt-4">
          <button
            onClick={onSaveNoteClicked}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-xl shadow transition duration-200"
          >
            Save Note
          </button>

        </div>

      </div>
    </>
  )

  return content
}

export default NewNoteForm