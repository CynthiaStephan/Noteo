import { NavCree } from '../../Nav/NavCree'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './CreeCompte.css';


export const CreeCompte = () => {

    const [newUser, setNewUser] = useState({ first_name: '', last_name: '', email: '', password: '' })
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleForm = (e) => {
        if (e.target.id === "confirmPassword") {
            setConfirmPassword(e.target.value)
        } else {
            setNewUser((prevUser) => ({ ...prevUser, [e.target.id]: e.target.value }))
        }
    }

    const createUser = () => {

        if (newUser.password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !")
            return
        }
        if (Object.values(newUser).some(value => value === '') || confirmPassword === '') {
            alert("Veuillez remplir tous les champs !")
            return
        }

        console.log(newUser)
        fetch(`http://localhost:5000/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
    }

    return (
        <>
            <NavCree />
            <div className='pageFrom'>
                <h2>Crée un compte</h2>
                <div className="formList">
                    <TextField onChange={(e) => handleForm(e)} id="last_name" label="Nom:" variant="standard" required />
                    <TextField onChange={(e) => handleForm(e)} id="first_name" label="Prénom:" variant="standard" required />
                    <TextField onChange={(e) => handleForm(e)} id="email" label="Mail:" variant="standard" required />
                    <TextField onChange={(e) => handleForm(e)} id="password" label="mot de passe:" variant="standard" type="password" required />
                    <TextField onChange={(e) => handleForm(e)} id="confirmPassword" label="Confirmer mot de passe:" variant="standard" type="password" required />
                </div>

                <Button onClick={createUser} variant="contained">Crée</Button>
            </div>
        </>
    )
}