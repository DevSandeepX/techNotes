import React from 'react'
// import { Outlet } from 'react-router-dom'
import { Routes, Route, Outlet } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import UserList from './features/users/UserList'
import NoteList from './features/notes/NoteList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from '../hooks/useTitle'


function App() {
  useTitle('techNotes')
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        {/* Persistent login wrapper */}
        <Route element={<PersistLogin />}>

          {/* RequireAuth wrapper for role-protected routes */}
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>

            {/* Prefetch wrapper for data loading */}
            <Route element={<Prefetch />}>
              <Route path='dash' element={<DashLayout />}>

                <Route index element={<Welcome />} />

                {/* User Routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />}>
                <Route path='users'>
                  <Route index element={<UserList />} />
                  <Route path=':id' element={<EditUser />} />
                  <Route path='new' element={<NewUserForm />} />
                </Route>
                </Route>
                {/* Note Routes */}
                <Route path='notes'>
                  <Route index element={<NoteList />} />
                  <Route path=':id' element={<EditNote />} />
                  <Route path='new' element={<NewNote />} />
                </Route>

              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>

  )
}

export default App