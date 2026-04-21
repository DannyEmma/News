import { useRouteError } from 'react-router-dom'

import './ErrorBoundary.css'

export default function ErrorBoundary(){
    const errors = useRouteError()

    return (
        <div id="error-boundary">
            <p>{errors.toString()}</p>
        </div>
    )
}