import { NavCree } from '../../Nav/NavCree'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";

import './CreeCompte.css';


export const CreeCompte = () => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({ first_name: '', last_name: '', email: '', password: '' })
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleForm = (e) => {
        if (e.target.id === "confirmPassword") {
            setConfirmPassword(e.target.value)
        } else {
            setNewUser((prevUser) => ({ ...prevUser, [e.target.id]: e.target.value }))
        }
    }

    const createUser = (e) => {
        e.preventDefault()

        if (newUser.password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !")
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
            .then(data => {
                console.log(data)
                if (data.error) {
                    alert(data.error)
                } else {
                    alert('Compte crée avec succès')
                    navigate('/')
                }
            })
            .catch(error => console.error(error))
    }

    return (
        <>
            <NavCree />
            <form onSubmit={(e) => { createUser(e) }} className='pageFrom'>
                <h2>Crée un compte</h2>
                <div className="formList">
                    <TextField onChange={(e) => handleForm(e)} id="last_name" label="Nom:" variant="standard" required />
                    <TextField onChange={(e) => handleForm(e)} id="first_name" label="Prénom:" variant="standard" required />
                    <TextField onChange={(e) => handleForm(e)} id="email" label="Mail:" variant="standard" required />
                    <TextField onChange={(e) => handleForm(e)} id="password" label="mot de passe:" variant="standard" type="password" required />
                    <TextField onChange={(e) => handleForm(e)} id="confirmPassword" label="Confirmer mot de passe:" variant="standard" type="password" required />
                </div>

                <Button type="submit" variant="contained">Crée</Button>
            </form>
        </>
    )
}