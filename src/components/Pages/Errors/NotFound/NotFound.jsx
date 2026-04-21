import SearchBar from '../../../SearchBar/SearchBar'

import './NotFound.css'

export default function NotFound(){
    return (
        <div id="not-found">
            <h1>Oh-oh !</h1>
            <p>Cela pourrait être vous, ou cela pourrait être nous, mais il n'y a pas de page ici.</p>
            <SearchBar variant="search-page"/>
        </div>
    )
}