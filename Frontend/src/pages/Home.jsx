import React from 'react'
import Hero from "../components/Hero.jsx"
import Biography from "../components/Biography.jsx"
import Departments from "../components/Departments.jsx"
import MessageForm from "../components/MessageForm.jsx"
import { ToastContainer } from 'react-toastify'

function Home() {
  return (
    <div>
      <Hero title={"Welcome to ZeeCare Medical Institute"} imageUrl={"/hero.png"}/>
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
    </div>
  )
}

export default Home
