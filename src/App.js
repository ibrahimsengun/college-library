import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LibraryPage from "./components/LibraryPage";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import RegisterForm from "./components/RegisterForm";
import AuthContext from "./context/auth-context";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Fragment>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          {!isLoggedIn && <Route path="/login" element={<LoginForm />} />}
          {!isLoggedIn && <Route path="/register" element={<RegisterForm />} />}
          {isLoggedIn && <Route path="/library" element={<LibraryPage />} />}
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
