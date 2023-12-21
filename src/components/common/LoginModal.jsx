import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function LoginModal({modalValue,setShowLogin}) {

 const openGoogle = () => {
    window.open("http://127.0.0.1:8000/auth/google","_self")
 }

 const makeCall = () => {
    fetch('http://127.0.0.1:8000/autherised-google-user')
    .then(res => res.json())
    .then(json => console.log(json))
 }

  return (
    <div className='loginModal'>
        <Modal show={modalValue} >
            <Modal.Body>
                <div className="btn btn-primary" onClick={openGoogle}>
                    Login with google
                </div>
                <div className="btn btn-primary" onClick={makeCall}>
                    Call API
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShowLogin(false)}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}