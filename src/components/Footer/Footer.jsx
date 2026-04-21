import SearchBar from '../SearchBar/SearchBar'
import { Link } from 'react-router-dom'

import './Footer.css'


/**
 *  This component is the footer placed at the bottom of the page
 *
 * @export
 * @return {React.Element} 
 */
export default function Footer(){
    return (
        <footer>
            <div className="container">
                <SearchBar/>

                <div id="category-links">
                    <p>Catégories</p>
                    <ul>
                        <li><Link to="/divertissement">divertissement</Link></li>
                        <li><Link to="/entreprise">entreprise</Link></li>
                        <li><Link to="/politique">politique</Link></li>
                        <li><Link to="/sante">santé</Link></li>
                        <li><Link to="/science">science</Link></li>
                        <li><Link to="/sports">sports</Link></li>
                        <li><Link to="/technologie">technologie</Link></li>
                    </ul>
                </div>

                <div id="socials-network">
                    <Link to="/"><img id="footer-logo" src="/logo.svg" alt="Logo" /></Link>
                    
                    <ul>
                        <li>
                            <a href="https://www.linkedin.com/in/danny-emma-015715162/" target='_blank'>
                                <img src="/linkedin.svg" alt="Linkedin Icon" />
                                <span>Linkedin</span>
                            </a>
                            
                        </li>
                        <li>
                            <a href="https://github.com/EmmaDannyDev" target='_blank'>
                                <img src="/github.svg" alt="Github Icon" /><span>Github</span>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:emmadanny@live.fr">
                                <img src='/mail.svg' alt='Mail Icon'/>
                                <span>emmadanny@live.fr</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div id="copyright-container">
                    <p>
                        Créé avec passion en React.js, inspiré par l'innovation de CNN. <br />
                        © 2024 Emma Danny. Tous droits réservés.
                    </p>
                </div>

            </div>
        </footer>
    )
}