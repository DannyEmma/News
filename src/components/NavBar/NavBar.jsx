import { useState, useEffect } from "react"
import { NavLink, Link, useLocation, useParams } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"

import "./NavBar.css"

/**
 *  This component is the nav bar into the header
 *
 * @export
 * @param {string} {variant} desktop | mobile
 * @return {React.ReactElement}
 */
export default function NavBar({ variant }) {
  const [currentVariant, setCurrentVariant] = useState(variant)
  const [activeLinkMobile, setActiveLinkMobile] = useState("Accueil")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const location = useLocation()
  let { query } = useParams()
  query = query ? query.replaceAll(" ", "%20") : ""

  //-- Use to change the variant of NavBar ( desktop, mobile ) --
  useEffect(() => {
    const handleChangeVariant = () => {
      const isMobile = window.matchMedia("(max-width: 979px)").matches
      isMobile ? setCurrentVariant("mobile") : setCurrentVariant("desktop")
    }

    //-- Call when resize--
    window.addEventListener("resize", handleChangeVariant)

    //-- Initial call --
    handleChangeVariant()

    return () => window.removeEventListener("resize", handleChangeVariant)
  }, [])

  //-- Use to change the active link mobile and hide mobile menu and hide search bar --
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveLinkMobile("Accueil")
        break
      case "/divertissement":
        setActiveLinkMobile("Divertissement")
        break
      case "/entreprise":
        setActiveLinkMobile("Entreprise")
        break
      case "/politique":
        setActiveLinkMobile("Politique")
        break
      case "/sante":
        setActiveLinkMobile("Santé")
        break
      case "/science":
        setActiveLinkMobile("Science")
        break
      case "/sports":
        setActiveLinkMobile("Sports")
        break
      case "/technologie":
        setActiveLinkMobile("Technologie")
        break
      case `/search/${query}`:
        setActiveLinkMobile("Recherche")
        break
    }

    if (showMobileMenu) setShowMobileMenu(false)
    if (showSearchBar) setShowSearchBar(false)
  }, [location.pathname])

  //-- Use to disabled scroll when mobile menu is open --
  useEffect(() => {
    if (showMobileMenu) {
      document.querySelector("body").classList.add("no-scroll")
    } else {
      document.querySelector("body").classList.remove("no-scroll")
    }
  }, [showMobileMenu])

  return (
    <>
      <nav id="nav-bar">
        <ul>
          {currentVariant === "mobile" && (
            <>
              {showMobileMenu ? (
                <li onClick={() => setShowMobileMenu((v) => !v)}>
                  <img id="hamburger-menu-cross" src="/cross.svg" alt="Cross Icon" />
                </li>
              ) : (
                <li
                  onClick={() => {
                    if (showSearchBar) setShowSearchBar(false)
                    setShowMobileMenu((v) => !v)
                  }}
                >
                  <img id="hamburger-menu-icon" src="/hamburger-menu.svg" alt="Menu Icon" />
                </li>
              )}
            </>
          )}

          <li>
            <Link to="/">
              <img id="logo-header" src="/logo.svg" alt="Logo" />
            </Link>
          </li>

          {currentVariant === "mobile" && (
            <li id="active-link-mobile">
              <p>{activeLinkMobile}</p>
            </li>
          )}
        </ul>

        {(currentVariant === "desktop" || (currentVariant === "mobile" && showMobileMenu)) && (
          <ul id="nav-bar-menu">
            <li>
              <NavLink to="/divertissement">Divertissement</NavLink>
            </li>
            <li>
              <NavLink to="/entreprise">Entreprise</NavLink>
            </li>
            <li>
              <NavLink to="/politique">Politique</NavLink>
            </li>
            <li>
              <NavLink to="/sante">Santé</NavLink>
            </li>
            <li>
              <NavLink to="/science">Science</NavLink>
            </li>
            <li>
              <NavLink to="/sports">Sports</NavLink>
            </li>
            <li>
              <NavLink to="/technologie">Technologie</NavLink>
            </li>
          </ul>
        )}

        <ul>
          <li
            onClick={() => {
              if (showMobileMenu) setShowMobileMenu(false)
              setShowSearchBar((v) => !v)
            }}
          >
            <img id="search-icon-header" src="/search-icon-white.svg" alt="Search Icon" />
          </li>
        </ul>
      </nav>

      {showSearchBar && (
        <div id="header-search-bar-container">
          <SearchBar />
        </div>
      )}
    </>
  )
}
