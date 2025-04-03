import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import { createContext, useState } from "react";
import SharedLayout from "./sharedLayout/SharedLayout";
import AddTournment from "./pages/AddTournment";
import TournamentsSharedLayout from "./sharedLayout/TournamentsSharedLayout";
import NotFound from "./pages/NotFound";
import Bracket from "./pages/Bracket";
import AdminRoute from "./pages/AdminRoute";
import Settings from "./pages/Settings";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState({
    name: "",
    isAdmin: false,
    email: "",
    isAuthenticed: false,
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path='auth'>
            <Route
              path='login'
              element={
                <userContext.Provider value={{ user, setUser }}>
                  <Login />
                </userContext.Provider>
              }
            />
          </Route>
          {/* Main Routes */}

          <Route
            path='/'
            element={
              <userContext.Provider value={{ user, setUser }}>
                <ProtectedRoute>
                  <SharedLayout />
                </ProtectedRoute>
              </userContext.Provider>
            }>
            <Route
              index
              element={<Main />}
            />
            <Route
              path='addTournament'
              element={
                <AdminRoute>
                  <AddTournment />
                </AdminRoute>
              }
            />
            <Route
              path='tournaments/:tournamentId'
              element={<TournamentsSharedLayout />}>
              <Route
                path='bracket'
                element={<Bracket />}
              />
              <Route
                path='settings'
                element={<Settings />}
              />
            </Route>
          </Route>
          <Route
            to='*'
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
