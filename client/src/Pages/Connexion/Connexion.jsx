import { NavConnexion } from '../../Nav/NavConnexion'
import { Link } from "react-router"
import TextField from '@mui/material/TextField';
import './Connexion.css'

export const Connexion = () => {
    return (
        <>
            <NavConnexion />
            <div className='pageFrom'>
            <h2>Connexion</h2>
            <div className="formList">
                <TextField id="identifiant" label="identifiant:" variant="standard" />
                <TextField id="mot-de-passe" label="mot de passe:" variant="standard" />
            </div>
            <button><p>se connecter</p></button>
            </div>
            <Link to={'./cree_compte'} >Cree compte</Link> <br />
            <Link to={'./questionnaire'} >Questionnaire</Link> <br />
            <Link to={'./formateur'} >Formateur</Link> <br />
            <Link to={'./ajout_questionnaire'} >Ajout questionnaire</Link> <br />
            <Link to={'./profil'} >Profil</Link>
        </>
    )
}