import Button from '@mui/material/Button';
import { useNavigate } from "react-router";

import './Nav.css'

export const NavConnexion = () => {
    const navigate = useNavigate()

    const btnCreeCompte = () => {navigate('/cree_compte')}
    return (
        <nav>
            <h1>Noteo</h1>
            <Button onClick={btnCreeCompte} variant="contained">Cree un Compte</Button>
        </nav>
    )
}