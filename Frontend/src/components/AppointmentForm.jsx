import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AppointmentForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [hasVisited, setHasVisited] = useState("");
  const [address, setAddress] = useState("");

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

  const navigateTo = useNavigate()

  const[doctors,setDoctors] =useState([])
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          {
            withCredentials: true,
          }
        );
        const doctorsData = response.data.doctors;
        if (doctorsData) {
          setDoctors(doctorsData);
        //   console.log(doctors)
          console.log("Fetched doctors:", doctorsData); // Debug log
        } else {
          console.error("No doctors found in response");
          toast.error("No doctors found");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to fetch doctors");
      }
    };
    fetchDoctors();
    
  }, []);







  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>

      <form onSubmit={handleAppointment}>
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
            type="date"
            value={appointmentDate}
            placeholder="Appointment Date"
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <div>
          <select
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
              console.log("Doctors state updated:", doctors);
            }}
            value={department}
          >
            <option value="" disabled>
              Select Department{" "}
            </option>
            {departmentsArray.map((depart, index) => {
              return (
                <option value={depart} key={index}>
                  {depart}
                </option>
              );
            })}
          </select>
          
          <select
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(" ");
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
              
            }}
            disabled={!department}
          >
            <option value="">Select Doctor</option>
            
            {
            doctors
              .filter((doctor) => doctor.doctorDepartment === department)
              .map((doctor, index) => {
                return (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                );
              })}
          </select>
        </div>
        <textarea
          rows="10"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Have you visited before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            style={{ flex: "none", width: "25px" }}
          />
        </div>
        <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
      </form>
    </div>
  );
}
export default AppointmentForm;
