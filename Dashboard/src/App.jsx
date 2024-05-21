import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router ,Route,Routes} from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import AddNewDoctor from "./components/AddNewDoctor"
import AddNewAdmin from "./components/AddNewAdmin"
import Doctors from "./components/Doctors"
import Messages from "./components/Messages"
import { ToastContainer } from "react-toastify";
import {Context} from "./main"
import axios from "axios"
import Sidebar from './components/Sidebar'
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(Context)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);





  return (
<>
<Router >
  <Sidebar />
  <Routes>
    <Route  path="/" element={<Dashboard />}/>
    <Route  path="/login" element={<Login />}/>
    <Route  path="/doctor/addnew" element={<AddNewDoctor/>}/>
    <Route  path="/admin/addnew" element={<AddNewAdmin/>}/>
    <Route  path="/messages" element={<Messages />}/>
    <Route  path="/doctors" element={<Doctors />}/>
  </Routes>
  <ToastContainer position="top-center" />
</Router>
</>
  )
}

export default App
