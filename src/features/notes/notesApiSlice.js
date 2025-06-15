import { apiSlice } from '../../app/api/apiSlice'
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.
        completed ? 1 : -1
})
const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotes: builder.query({
            query: () => '/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData) => {
                const lodedNotes = responseData.map(({ _id, ...rest }) => ({
                    id: _id,
                    ...rest
                }))
                return notesAdapter.setAll(initialState, lodedNotes)
            },

            providesTags: (result, err, arg) => {
                if (result?.ids) {
                    return [
                        ...result.ids.map((id) => ({ type: 'Note', id })),
                        { type: 'Note', id: 'LIST' }
                    ]
                } else {
                    return [{ type: 'Note', id: 'LIST' }]
                }
            }


        }

        ),
        addNewNote: builder.mutation({
            query: initialNoteData => ({
                url: '/notes',
                method: 'POST',
                body: {
                    ...initialNoteData
                }
            }),
            invalidatesTags: [
                { type: 'Note', id: 'LIST' }
            ]
        }),

        updateNote: builder.mutation({
            query: initialNoteData => ({
                url: 'notes',
                method: 'PATCH',
                body: {
                    ...initialNoteData
                }
            }),

            invalidatesTags: [{ type: 'Note', id: 'LIST' }]
        }),

        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: 'notes',
                method: 'DELETE',
                body: { id }
            }),

            invalidatesTags: (result, err, arg) => [
                { type: 'Note', id: arg.id }
            ]
        })
    }),

})


export const {
    useGetAllNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
} = notesApiSlice


export const selectNoteResult = notesApiSlice.endpoints.getAllNotes.select()

const selectNoteData = createSelector(
    selectNoteResult,
    noteResult => noteResult.data
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapter.getSelectors(state => selectNoteData(state) ?? initialState)



