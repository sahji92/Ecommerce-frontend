import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Topbar({setShowlogin}) {

  const setLogin = () => {
    let x = true
    console.log(x)
    setShowlogin(x)
  }

  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.clear();
    navigate('/')
  }

  return (
    <div className='topbar'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex flex-row-reverse">
          {sessionStorage.getItem('user_data') ? 
          <>
            <button className='btn btn-success m-2' onClick={()=>navigate('/cart')}>Cart</button>
            <button className='btn btn-danger m-2' onClick={logout}>Logout</button>
          </>
          :
          <button className='btn btn-success m-2' onClick={setLogin}>Login</button>
          }
        </nav>
    </div>
  )
}