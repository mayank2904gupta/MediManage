import React ,{useState ,useContext}from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddNewAdmin() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const navigateTo = useNavigate();

  const HandleAdminNew = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/admin/addnew",
        {
          email,
          firstName,
          lastName,
          phone,
          password,
          nic,
          dob,
          gender
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);

      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
    <section className='page'>
    <div className="add-admin-form container form-component">
      <img src="/logo (1).png" alt="logo" />
      <h1 className='form-title'>ADD NEW ADMIN</h1>
    <form onSubmit={HandleAdminNew}>
      <div>
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        </div>
        <div>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        </div>
        <div>
        <input
          type="number"
          value={nic}
          placeholder="NIC"
          onChange={(e) => setNic(e.target.value)}
        />
        <input
          type="date"
          value={dob}
          placeholder="Date of Birth"
          onChange={(e) => setDob(e.target.value)}
        />
        </div>
        <div>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)} // Handle gender change
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{ justifyContent: "center", alignItems: "center" }}>
        <button type="submit">ADD NEW ADMIN</button>
      </div>
    </form>
  </div>
  </section>
    </>
  )
}

export default AddNewAdmin
