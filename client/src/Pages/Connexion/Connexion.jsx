import { NavConnexion } from '../../Nav/NavConnexion'
import { Link } from "react-router"
import './Connexion.css'

export const Connexion = () => {
    return (
        <>
            <NavConnexion />
            <h2>Connexion</h2>

            <Link to={'./cree_compte'} >cree compte</Link> <br />
            <Link to={'./questionnaire'} >questionnaire</Link> <br />
            <Link to={'./formateur'} >formateur</Link> <br />
            <Link to={'./ajout_questionnaire'} >ajout questionnaire</Link>
        </>
    )
}