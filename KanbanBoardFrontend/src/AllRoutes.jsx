import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import CreateTask from './Pages/createTask/CreateTask'
import GetTask from './Pages/Tasks/GetTask'
import GetTaskById from './Pages/Tasks/GetTaskById'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/user/login' element={<Login/>} />
            <Route path='/user/register' element={<Register/>} />
            <Route path='/task/create' element={<CreateTask/>} />
            <Route path='/task/all' element={<GetTask/>} />
            <Route path='/task/all/:id' element={<GetTaskById/>} />
      </Routes>
    </div>
  )
}

export default AllRoutes
