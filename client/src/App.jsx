
import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from './dashboard/layout/MainLayout'
import AdminIndex from './dashboard/pages/AdminIndex'
import Login from './dashboard/pages/Login'
import ProtectDashboatd from './middleware/ProtectDashboatd'
import ProtectRole from './middleware/ProtectRole'
import Unable from './dashboard/pages/Unable'
import AddWriter from './dashboard/pages/AddWriter'
import Writers from './dashboard/pages/Writers'
import News from './dashboard/pages/News'
import Profile from './dashboard/pages/Profile'
import WriterIndex from './dashboard/pages/WriterIndex'
import CreateNews from './dashboard/pages/CreateNews'
import storeContext from './context/storeContext'
import Edit_news from './dashboard/pages/Edit_news'

function App() {

  const { store } = useContext(storeContext)

  return (
    <BrowserRouter>
      <Routes>

        {/* Root Route */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard */}
        <Route path="/dashboard" element={<ProtectDashboatd />}>

          <Route element={<MainLayout />}>

            {/* Dashboard Index */}
            <Route
              index
              element={
                store.userInfo?.role === 'admin'
                  ? <Navigate to="/dashboard/admin" replace />
                  : store.userInfo?.role === 'writer'
                    ? <Navigate to="/dashboard/writer" replace />
                    : <Navigate to="/dashboard/unable-access" replace />
              }
            />

            {/* Common Routes */}
            <Route path="unable-access" element={<Unable />} />
            <Route path="news" element={<News />} />
            <Route path="profile" element={<Profile />} />

            {/* Admin Routes */}
            <Route element={<ProtectRole role="admin" />}>
              <Route path="admin" element={<AdminIndex />} />
              <Route path="writer/add" element={<AddWriter />} />
              <Route path="writers" element={<Writers />} />
            </Route>

            {/* Writer Routes */}
            <Route element={<ProtectRole role="writer" />}>
              <Route path="writer" element={<WriterIndex />} />
              <Route path="news/create" element={<CreateNews />} />
              <Route
                path="news/edit/:news_id"
                element={<Edit_news />}
              />
            </Route>

          </Route>
        </Route>

        {/* Unknown Routes */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
