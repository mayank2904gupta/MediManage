import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AddNewDoctor() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const HandleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);

      const response = await axios.post(
        "http://localhost:4000/api/v1/user/doctor/addnew",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
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
      <section className="page">
        <div className="add-doctor-form container form-component">
          <img src="/logo (1).png" alt="logo" />
          <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
          <form onSubmit={HandleAddNewDoctor}>
            <div className="first-wrapper">
            <div style={{ flexDirection: 'column' }}>

                <img
                  src={
                    docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"
                  }
                  alt="Doctor Avatar"
                />
                <input type="file" onChange={handleAvatar} />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {/* </div>
            <div> */}
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {/* </div>
            <div> */}
                <input
                  type="number"
                  placeholder="NIC"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                />
                <input
                  type={"date"}
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                {/* </div>
            <div> */}
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <select
                  value={doctorDepartment}
                  onChange={(e) => {
                    setDoctorDepartment(e.target.value);
                  }}
                >
                  <option value="">Select Department</option>
                  {departmentsArray.map((depart, index) => {
                    return (
                      <option value={depart} key={index}>
                        {depart}
                      </option>
                    );
                  })}
                </select>
                {/* </div>
            <div> */}
                <button type="submit">Register New Doctor</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddNewDoctor;
