import { createBrowserRouter, Navigate } from 'react-router-dom'
import AddUserPage from './pages/AddUserPage'
import NotFoundPage from './pages/NotFoundPage'
import UserDetailsPage from './pages/UserDetailsPage'
import UsersPage from './pages/UsersPage'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/users" replace /> },
  { path: '/users', element: <UsersPage /> },
  { path: '/users/add', element: <AddUserPage /> },
  { path: '/users/:id', element: <UserDetailsPage /> },
  { path: '*', element: <NotFoundPage /> },
])
