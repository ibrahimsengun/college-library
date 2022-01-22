import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
