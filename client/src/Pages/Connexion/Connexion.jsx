import { NavConnexion } from '../../Nav/NavConnexion'
import { Link } from "react-router"
import './Connexion.css'

export const Connexion = () => {
    return (
        <>
            <NavConnexion />
            <h2>Connexion</h2>

            <Link to={'./cree_compte'} >Cree compte</Link> <br />
            <Link to={'./questionnaire'} >Questionnaire</Link> <br />
            <Link to={'./formateur'} >Formateur</Link> <br />
            <Link to={'./ajout_questionnaire'} >Ajout questionnaire</Link> <br />
            <Link to={'./profil'} >Profil</Link>
        </>
    )
}