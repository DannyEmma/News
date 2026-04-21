import { Link } from 'react-router-dom'

import NavBar from '../NavBar/NavBar'

import './Header.css'
import { useEffect } from 'react'


/**
 *  This component is the Header placed at the top of the page
 *
 * @export
 * @return {React.Element} 
 */
export default function Header(){

    return (
        <header>
            <p><Link to="/"><span id="big-letter">N</span>EWS.</Link></p>

            <div className="container">
                <NavBar variant='desktop'/>
            </div>
        </header>
    )
}