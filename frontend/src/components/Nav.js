import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'



function Nav() {
  //const navigate=useNavigate()


const {id}=useParams();
return (

  <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

    <div class="container-fluid">
        <h1 className="navbar-brand">Digitization Handwritten Chess Game Scoresheets</h1>
        <div className=''>
        <Link to="/" className="me-2">Camera</Link>
        <Link to="/upload" className="me-2">Upload Scoresheet</Link>
        <Link
          to="https://docs.google.com/presentation/d/1iTzYNTvwiY2zQe1F5oXYlJ-SuYl84hvOaCwS4CbMx68/edit?usp=sharing"
          className="me-2"
          target="_blank">
          Slides
        </Link>
        </div>
      </div>

  </nav>

  </>

)
}

export default Nav
