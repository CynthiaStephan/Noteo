import { NavConnexion } from '../../Nav/NavConnexion'
import { useState } from 'react';
import { useNavigate } from "react-router";
import { Link } from "react-router"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import './Connexion.css';

export const Connexion = () => {
    
    const navigate = useNavigate()
    const [user, setUser] = useState({ email: '', password: '' })

    const handleForm = (e) => {
        setUser((prevUser) => ({ ...prevUser, [e.target.id]: e.target.value }))
    }

    const connexion = (e) => {
        e.preventDefault() 
        console.log(user)

        fetch(`http://localhost:5000/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.role === 'intern') {
                    navigate('/questionnaire')
                    localStorage.setItem('userId', data.id)
                } else if (data.role === 'trainer' || data.role === 'admin') {
                    navigate('/formateur')
                    localStorage.setItem('userId', data.id)
                }
            })
            .catch(error => console.error(error))
    }

    return (
        <>
            <NavConnexion />
            <form onSubmit={(e) => {connexion(e)}} className='pageFrom'>
                <h2>Connexion</h2>
                <div className="formList">
                    <TextField onChange={(e) => handleForm(e)} id="email" label="identifiant:" variant="standard" required />
                    <TextField onChange={(e) => handleForm(e)} id="password" label="mot de passe:" variant="standard" type="password" required />
                </div>
                <Button type="submit" variant="contained">Crée</Button>
            </form>


            <Link to={'./questionnaire'} >Questionnaire</Link> <br />
            <Link to={'./formateur'} >Formateur</Link> <br />
            <Link to={'./ajout_questionnaire'} >Ajout questionnaire</Link> <br />
        </>
    )
}