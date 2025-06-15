import { apiSlice } from '../../app/api/apiSlice'
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData) => {
                const lodedUsers = responseData.map(({ _id, ...rest }) => ({
                    id: _id,
                    ...rest
                }))
                return usersAdapter.setAll(initialState, lodedUsers)
            },

            providesTags: (result, err, arg) => {
                if (result?.ids) {
                    return [
                        ...result.ids.map((id) => ({ type: 'User', id })),
                        { type: 'User', id: 'LIST' }
                    ]
                } else {
                    return [{ type: 'User', id: 'LIST' }]
                }
            }


        }

        ),

        addNewUser: builder.mutation({
            query:initialUserData=>({
                url:'/users',
                method:'POST',
                body:{
                    ...initialUserData
                }
            }),
            invalidatesTags:[
                {type: 'User', id:'LIST'}
            ]
        }),

        updateUser:builder.mutation({
            query:initialUserData=>({
                url:'users',
                method:'PATCH',
                body:{
                    ...initialUserData
                }
            }),

            invalidatesTags:[{type:'User', id:'LIST'}]
        }),

        deleteUser:builder.mutation({
            query:({ id })=>({
                url:'users',
                method:'DELETE',
                body:{ id }
            }),

            invalidatesTags:(result, err, arg)=>[
                { type:'User', id: arg.id}
            ]
        })
    }),

})


export const {
    useGetAllUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApiSlice


export const selectUserResult = usersApiSlice.endpoints.getAllUsers.select()

const selectUserData = createSelector(
    selectUserResult,
    userResult => userResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUserData(state) ?? initialState)



