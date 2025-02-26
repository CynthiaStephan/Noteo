import { NavProfil } from '../../Nav/NavProfil'
import './Profil.css'
import TextField from '@mui/material/TextField';

export const Profil = () => {
    return (
        <>
            <NavProfil />
                        <div className='pageFrom'>
                            <h2>Modifier Profil</h2>
                            <div className="formList">
                                <TextField id="nom" label="Nom:" variant="standard" />
                                <TextField id="prenom" label="Prénom:" variant="standard" />
                                <TextField id="mail" label="Mail:" variant="standard" />
                                <TextField id="mot-de-passe" label="mot de passe:" variant="standard" />
                                <TextField id="confirmer-mot-de-passe" label="Confirmer mot de passe:" variant="standard" />
                            </div>
                            <button><p>Modifier</p></button>
                        </div>
        </>
    )
}