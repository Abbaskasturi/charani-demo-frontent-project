import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Protected from './components/Protected';
import Registration from "./components/Registration";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";
import Addadmin from "./components/Addadmin"; 
import Viewstudent from "./components/Viewstudent";

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/landingpage' element ={<Registration/>}/> 
        <Route path="/admin" element ={<AdminLogin/>} />
        <Route path='/' element={
          <Protected>
            <Home/>
          </Protected>
  
        }/>
        <Route path='/adminhome' element={
          <Protected>
            <AdminHome/>
          </Protected>
  
        }/>
         <Route path='/addadmin' element={
          <Protected>
            <Addadmin/>
          </Protected>
  
        }/>
         <Route path='/bookedstudents' element={
          <Protected>
            <Viewstudent/>
          </Protected>
  
        }/>
      </Routes>
    </BrowserRouter>
  )
}
export default App 

