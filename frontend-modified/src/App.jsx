import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './layout/Header'
import ListTasks from './pages/task/ListTasks'
import UserTasks from './pages/task/UserTasks'
import AddTask from './pages/task/AddTask'
import TaskData from './pages/task/TaskData'

import ListCategories from './pages/category/ListCategories'
import AddCategory from './pages/category/AddCategory'
import CategoryData from './pages/category/CategoryData'

import Login from "./pages/authorization/Login";
import Register from "./pages/authorization/Register";
import Profile from "./pages/authorization/Profile";
import { connect } from "react-redux";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path='/listTasks' element={<ListTasks/>} />
              <Route path='/myTasks' element={<UserTasks/>} />
              <Route path='/addTask' element={<AddTask/>} />
              <Route path='/task/:id' element={<TaskData/>} />
              <Route path="/listCategories" element={<ListCategories/>}/>
              <Route path='/addCategory' element={<AddCategory/>} />
              <Route path='/category/:id' element={<CategoryData/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/profile" element={<Profile/>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

// функциональность Redux: позволяет передать на перенаправляемые страницы данные
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

// передача данных к другим компонентам
export default connect(mapStateToProps)(App);
