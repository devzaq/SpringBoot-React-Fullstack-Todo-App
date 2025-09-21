import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./TodoApp.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import ErrorPage from "./pages/ErrorPage";
import ListTodoPage from "./pages/ListTodoPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import WelcomePage from "./pages/WelcomePage";

import AuthContextProvider from "./security/AuthContext";
import AuthenticatedRoute from "./security/AuthenticatedRoute";
import TodoPage from "./pages/TodoPage";

function TodoApp() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AuthenticatedRoute />}>
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/todos" element={<ListTodoPage />} />
              <Route path="/todo/:id" element={<TodoPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default TodoApp;
