import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function LoginModal({modalValue,setShowlogin}) {

 const openGoogle = () => {
    window.open("http://127.0.0.1:8000/auth/google","_self")
 }

  return (
    <div className='loginModal'>
        <Modal show={modalValue} >
            <Modal.Body>
                <div className="btn btn-primary" onClick={openGoogle}>
                    Login with google
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShowlogin(false)}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}