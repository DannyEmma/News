import { useEffect, useId, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import './SearchBar.css'

/**
 * This component is a search bar 
 *
 * @export
 * @param {string} {variant = null} search-page
 * @return {React.ReactElement} 
 */
export default function SearchBar({variant = null, showSubHeader}){    
    const navigate = useNavigate()
    const { query } = useParams()    
    const inputId = useId()
    const inputRef = useRef(null)

    const searchBarVariant = variant ? `search-bar-${variant}` : ''

    const handleRedirect = () => {        
        if(inputRef.current.value){
            if(showSubHeader) showSubHeader(false)
            navigate(`/search/${inputRef.current.value}`)
            if(!variant) handleClear()
        }
    }

    const handleClear = () => inputRef.current.value = ''

    if(variant === 'search-page'){
        useEffect(() => {
            query ? inputRef.current.value = query : inputRef.current.value = ''
            
        },[query])
    }


    return  (
        <div className={`search-bar ${searchBarVariant}`}>
            <input
                id={inputId}
                onKeyUp={(e) => e.key === 'Enter' ? handleRedirect() : null}
                type="text"
                ref={inputRef}
                placeholder={variant !== 'search-page' ? 'Rechercher sur news...' : ''}
            />

            { variant === 'search-page' && 
                <button id="clear-input" onClick={handleClear}>Clear X</button>
            }

            <label onClick={handleRedirect} htmlFor={inputId} className='search-icon-container'><img src={variant === 'search-page' ? '/search-icon-white.svg' : '/search-icon-black.svg'} alt="Search Icon" /></label>
        </div>
    )
}