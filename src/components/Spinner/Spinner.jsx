import './Spinner.css'

export default function Spinner(){
    return (
        <div id="spinner">
            <p>Chargement des données en cours... </p>
            <img src="/spinner.gif" alt="Spinner Loading" />
        </div>
    )
}