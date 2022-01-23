import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import LoginPage from "./pages/LoginPage";
import Navigation from "./components/Navigation";
import RegisterPage from "./pages/RegisterPage";
import AuthContext from "./context/auth-context";

function App() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <Fragment>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          {user.isAdmin && <Route path="/admin" element={<AdminPage />} />}

          {isLoggedIn && <Route path="*" element={<HomePage />} />}
          {!isLoggedIn && <Route path="*" element={<LoginPage />} />}

          {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}
          {!isLoggedIn && <Route path="/register" element={<RegisterPage />} />}
          {isLoggedIn && <Route path="/library" element={<LibraryPage />} />}
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
