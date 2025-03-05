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
    addEventListener('resize', () => {
        const menuBurger = document.querySelector('.displayMobile')
        if (window.screen.width >= 670) {
            menuBurger.style.display = 'flex';
        }
        else {
            menuBurger.style.display = 'none';
        }
    })

    const navigate = useNavigate()


    const btnDeconnexion = () => {
        fetch(`http://localhost:5000/auth/logout`, {
            method: "POST",
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message === "Successfully logged out" || data.message === "You're already logout") {
                    navigate('/')
                }
            })
            .catch(error => console.error(error))
    }
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