import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

import './Nav.css'

export const NavBase = () => {
    const handleBurger = () => {
        const menuBurger = document.querySelector('.displayMobile')
        if (menuBurger.style.display == 'flex') {
            menuBurger.style.display = 'none'
        } else {
            menuBurger.style.display = 'flex'
        }
    }
    addEventListener('resize', () =>{
        const menuBurger = document.querySelector('.displayMobile')
        if (window.screen.width >= 670){
            menuBurger.style.display = 'flex';
        }
        else{
            menuBurger.style.display = 'none';
        }
    })

    const navigate = useNavigate()
    

    const btnDeconnexion = () => { navigate('/') }
    const btnProfil = () => { navigate('/profil') }

    return (
        <nav>
            <h1>Noteo</h1>
            <div>
                <div className='displayMobile'>
                    <Button id="btnProfil" onClick={btnProfil} variant="contained">Profil</Button>
                    <Button id="btnDeconnexion" onClick={btnDeconnexion} variant="contained">Se déconnecter</Button>
                </div>
                <IconButton id="btnBurger" onClick={handleBurger} aria-label="RemoveCircleOutlineIcon" size="large">
                    <MenuIcon fontSize="inherit" />
                </IconButton>
            </div>
        </nav>
    )
}