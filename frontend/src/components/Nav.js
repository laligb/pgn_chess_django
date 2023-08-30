import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {useParams} from 'react-router-dom'


function Nav() {
  //const navigate=useNavigate()


const {id}=useParams();
return (

  <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

    <div class="container-fluid">
        <h1 className="navbar-brand">Digitization Handwritten Chess Game Scoresheets</h1>
        <div className='</div>'>
        <Link to="/camera" className="me-2">Camera </Link>
        <Link to="/" className="me-2">Chessboard</Link>
        </div>
      </div>

  </nav>

  </>

)
}

export default Nav
