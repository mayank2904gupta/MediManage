import React, { useContext, useState } from "react";
import { Context } from "../main";
import { useNavigate, Navigate ,Link} from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
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

  const HandleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
        {
          email,
          firstName,
          lastName,
          phone,
          password,
          nic,
          dob,
          gender,
          role: "Patient",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="register-form container form-component">
      <h2>Sign Up</h2>
      <p>Please Sign Up To Continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quae
        optio tempora laboriosam reiciendis minus?
      </p>
      <form onSubmit={HandleRegister}>
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
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already Registered?</p>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Login Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Register</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
