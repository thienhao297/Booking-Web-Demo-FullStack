import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Hotels from "./pages/Hotels";
import NewHotel from "./pages/newHotel/NewHotel";
import Rooms from "./pages/Rooms";
import NewRoom from "./pages/newRoom/NewRoom";
import Trans from "./pages/Trans";
import EditHotel from "./pages/edit/EditHotel";
import EditRoom from "./pages/edit/EditRoom";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="hotels">
          <Route
            index
            element={
              <ProtectedRoute>
                <Hotels />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewHotel />
              </ProtectedRoute>
            }
          />
          <Route
            path=":hotelId"
            element={
              <ProtectedRoute>
                <EditHotel />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="rooms">
          <Route
            index
            element={
              <ProtectedRoute>
                <Rooms />
              </ProtectedRoute>
            }
          />
          <Route
            path=":roomId"
            element={
              <ProtectedRoute>
                <EditRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewRoom />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="trans">
          <Route
            index
            element={
              <ProtectedRoute>
                <Trans />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewRoom />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
