import { NavConnexion } from '../../Nav/NavConnexion'
import { use, useState } from 'react';
import { Link } from "react-router"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import './Connexion.css';

export const Connexion = () => {
    const [user, setUser] = useState({ email: '', password: '' })

    const handleForm = (e) => {
        setUser((prevUser) => ({ ...prevUser, [e.target.id]: e.target.value }))
    }
    
    const connexion = () => {

        console.log(user)
        fetch(`http://localhost:5000/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }

    return (
        <>
            <NavConnexion />
            <div className='pageFrom'>
            <h2>Connexion</h2>
            <div className="formList">
                <TextField onChange={(e) => handleForm(e)} id="email" label="identifiant:" variant="standard" />
                <TextField onChange={(e) => handleForm(e)} id="password" label="mot de passe:" variant="standard" type="password" />
            </div>
            <Button onClick={connexion} variant="contained">Crée</Button>
            </div>


            <Link to={'./cree_compte'} >Cree compte</Link> <br />
            <Link to={'./questionnaire'} >Questionnaire</Link> <br />
            <Link to={'./formateur'} >Formateur</Link> <br />
            <Link to={'./ajout_questionnaire'} >Ajout questionnaire</Link> <br />
            <Link to={'./profil'} >Profil</Link>
        </>
    )
}