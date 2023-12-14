import { Button, Modal } from 'react-bootstrap'

export default function LoginModal({modalValue,setShowLogin}) {

  return (
    <div className='loginModal'>
        <Modal show={modalValue}>
            <Modal.Header closeButton>
                <Modal.Title>Modal Heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You are reading this text in Modal
            </Modal.Body>
            <Modal.Footer>
            <Button variant='secondary' onClick={()=>setShowLogin(false)}>Close</Button>
            <Button variant='primary' onClick={()=>setShowLogin(false)}>Save changes</Button>
            </Modal.Footer>
            </Modal>
    </div>
  )
}
