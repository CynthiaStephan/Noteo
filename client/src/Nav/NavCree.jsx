import Button from '@mui/material/Button';
import { useNavigate } from "react-router";

import './Nav.css'

export const NavCree = () => {
    const navigate = useNavigate()
    
    const btnSeConnecter = () => {navigate('/')}
    return (
        <nav>
            <h1>Noteo</h1>
            <Button onClick={btnSeConnecter} variant="contained">Se connecter</Button>
        </nav>
    )
}