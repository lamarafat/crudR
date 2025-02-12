import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import User from './User'
import Form from './components/Form'
import Navbar from './components/Navbar'
import Update from './Update'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/form" element={<Form />} />
      <Route path="/update/:id" element={<Update />} />
    </Routes>
    </>
  )
}

export default App