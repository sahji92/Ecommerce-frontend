import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from '../components/common/Topbar'
import LoginModal from '../components/common/LoginModal'
import apiConnection from '../apiConnection'
import { apiEndpoints, httpMethods } from '../constants'

export default function HomepageLayout() {

  const [showLogin, setShowlogin] = useState(false)

  const checkAuthorizedUser = async () => {
    const data = await apiConnection(apiEndpoints.AUTHORIZED_USER,httpMethods.GET)
    if(data.status === 200){
        sessionStorage.setItem('user_data', JSON.stringify(data.data.data));
    } else {
      sessionStorage.clear();
      console.log("Unable to fetch products. Please try again later.")
    }
  }

  useEffect(()=>{checkAuthorizedUser()},[])

  return (
    <div className='dashboardLayout d-flex flex-column'>
        <Topbar setShowlogin={setShowlogin}/>
        <Outlet />
        <LoginModal modalValue={showLogin} setShowlogin={setShowlogin}/>
    </div>
  )
}