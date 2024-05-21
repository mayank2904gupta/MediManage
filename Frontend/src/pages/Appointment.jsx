import React from "react";
import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";

function Appointment() {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm />
    </>
  );
}

export default Appointment;
