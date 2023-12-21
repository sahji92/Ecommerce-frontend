import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from '../components/common/Topbar'
import LoginModal from '../components/common/LoginModal'

export default function HomepageLayout() {

  const [showLogin, setShowlogin] = useState(false)

  return (
    <div className='dashboardLayout d-flex flex-column'>
        <Topbar setShowlogin={setShowlogin}/>
        <Outlet />
        <LoginModal modalValue={showLogin} setShowlogin={setShowlogin}/>
    </div>
  )
}