import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Topbar({setShowLogin}) {

  const setLogin = () => {
    let x = true
    console.log(x)
    setShowLogin(x)
  }
  const navigate = useNavigate()
  return (
    <div className='topbar'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex flex-row-reverse">
                <button className='btn btn-success m-2' onClick={setLogin}>Login</button>
                <button className='btn btn-success m-2' onClick={()=>Navigate('/cart')}>Cart</button>
        </nav>
    </div>
  )
}