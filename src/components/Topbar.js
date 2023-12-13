import React from 'react'
import { Button } from 'react-bootstrap'

export default function Topbar() {
  return (
    <div className='topbar'>
      <div className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='d-flex'>
          <Button className='btn btn-success m-2'>Login</Button>
          <button></button>
        </div>
      </div>
    </div>
  )
}
