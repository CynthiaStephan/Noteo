import Button from '@mui/material/Button';
import { useNavigate } from "react-router";

import './Nav.css'

export const NavProfil = () => {
    const navigate = useNavigate()
    const btnDeconnexion = () => { navigate('/') }
    
    return (
        <nav>
            <h1>Noteo</h1>
            <Button id="btnDeconnexion" onClick={btnDeconnexion} variant="contained">Se déconnecter</Button>
        </nav>
    )
}