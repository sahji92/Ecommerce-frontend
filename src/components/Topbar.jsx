import React from 'react'
import { Button } from 'react-bootstrap'

export default function Topbar({setShowLogin}) {
  const setLogin=()=>{
    let x=true
    setShowLogin(x)
  }
  return (
    <div className='topbar'>
      <div className='navbar navbar-expand-lg bg-body-tertiary d-flex flex-row-reverse'>
          <Button className='btn btn-success m-2' onClick={setLogin}>Login</Button>
      </div>
    </div>
  )
}
